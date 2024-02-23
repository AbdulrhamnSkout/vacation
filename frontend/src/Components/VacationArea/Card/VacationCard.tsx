import Vacation from "../../../Models/Vacation";
import "./VacationCard.css";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notify";
import { useHistory } from "react-router";
import { VacationActionType } from "../../../Redux/VacationState";
import "../../../index.css"
import { io } from "socket.io-client";
import jwtAxios from "../../../Services/jwtAxios";


function VacationCard(prop: { vacation: Vacation, arr: { vacationId: number }[] }): JSX.Element {

    const history = useHistory()

    useEffect(() => {
        if (!store.getState().authState.user) {
            notify.error("you are not logged in")
            history.push("/login")
        }


    })
    const c = prop.arr.findIndex(v => v.vacationId === prop.vacation.vacationId) === -1 ? false : true
    const nameOfClass = c ? "VacationCard first" : "VacationCard"
    const [color, setColor] = useState<string>(c ? "red" : "black")
    const [numOfFollower, setFollow] = useState<number>(prop.vacation.followers)

    async function vacationDelete() {
        try {
            jwtAxios.delete("http://localhost:3001/api/vacation/" + prop.vacation.vacationId)
            store.dispatch({type:VacationActionType.VacationDeleted,payload:prop.vacation})
            const socket =  io("http://localhost:3001")
            socket.emit("admin-update","")
            setTimeout(()=> socket.disconnect(),100)
            notify.success("done delete")
        }
        catch (err) {
            notify.error(err)
        }

    }


    function edit() {
        history.push("/vacation/edit/" + prop.vacation.vacationId)
    }

    async function follow() {
        if (color === "black") {
            setColor("red")
            setFollow(numOfFollower + 1)
            notify.success("Following")
            await jwtAxios.post("http://localhost:3001/api/followers/follow", { userId: store.getState().authState.user.userId, vacationId: prop.vacation.vacationId })
            store.dispatch({ type: VacationActionType.VacationFollow, payload: { id: prop.vacation.vacationId, num: 1 } })
        }
        else {
            setColor("black")
            setFollow(numOfFollower - 1)
            notify.success("un Following")
            await jwtAxios.delete("http://localhost:3001/api/followers/follow/" + store.getState().authState.user.userId + "&" + prop.vacation.vacationId)
            store.dispatch({ type: VacationActionType.VacationFollow, payload: { id: prop.vacation.vacationId, num: -1 } })


        }

    }

    return (
        <div className={nameOfClass}>
            <span>description :</span>
            <textarea value={prop.vacation.description} disabled />
            <span >destination: {prop.vacation.destination} </span>
            <span >price: {prop.vacation.destination} </span>
            <span>start {prop.vacation.start}</span>
            <span>end {prop.vacation.end}</span>

            <img src={"http://localhost:3001/api/vacation/images/" + prop.vacation.imageName} alt="" />

            {store.getState().authState.user?.isAdmin === 0 && <svg onClick={follow} fill={color} width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" /></svg>
            }
            {store.getState().authState.user?.isAdmin === 1 && <>
                <Button variant="danger" onClick={vacationDelete} >delete</Button>
                <Button variant="secondary" onClick={edit} >edit</Button>
            </>
            }
            <span>followers {numOfFollower}</span>

        </div>
    );
}

export default VacationCard;
