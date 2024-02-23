import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { io } from "socket.io-client";
import Vacation from "../../../Models/Vacation";
import store from "../../../Redux/Store";
import { VacationActionType } from "../../../Redux/VacationState";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import "./EditVacation.css";


function EditVacation(): JSX.Element {

    const { id } = useParams<{ id: string }>();
    const parm = +id
    const vacation: Vacation = store.getState().vacationState.vacations.find(v => v.vacationId === parm)
    vacation.start=vacation.start.split("T")[0]
    vacation.end=vacation.end.split("T")[0]
    const { register, handleSubmit} = useForm<Vacation>({defaultValues :{...vacation}})
    const history = useHistory()

    useEffect(()=>{
        if(store.getState().authState.user ===null || store.getState().authState.user.isAdmin!==0){
            notify.error("please log in as admin")
            history.push("/login")
        }
    })

    async function send(vacation: Vacation) {

        try {
            const myFormData = new FormData();
            myFormData.append("description", vacation.description);
            myFormData.append("destination", vacation.destination);
            myFormData.append("price", vacation.price.toString());
            myFormData.append("start", vacation.start.toString());
            myFormData.append("end", vacation.end.toString());
            myFormData.append("image", vacation.image.item(0));
            const response = await jwtAxios.put<Vacation>("http://localhost:3001/api/vacation/"+ vacation.vacationId, myFormData)
            store.dispatch({ type: VacationActionType.VacationUpdated, payload: response.data })
            console.log("before use socket")
            const socket =  io("http://localhost:3001")
            socket.emit("admin-update")
            setTimeout(()=> socket.disconnect(),200)
            //  socket.disconnect() 
            notify.success("update success ")
            history.push("/vacation")


        }
        catch (err) {
            notify.error(err)
        }

    }


    return (
        <div className="EditVacation">
            <form onSubmit={handleSubmit(send)}>
                <label>description</label>
                <textarea  {...register("description")} />
                <br />
                <label>destination</label>
                <input type="text" {...register("destination")} />
                <br />
                <label>price</label>
                <br />
                <input type="number" {...register("price")} />
                <br />
                <label>start</label>
                <input type="date" {...register("start")} />
                <br />
                <label>end</label>
                <input type="date" {...register("end")} />
                <br />
                <label>image</label>
                <input type="file" accept="image/*"  {...register("image")} />
                <br />
                <Button type="submit" variant="success">send</Button>
            </form>
        </div>
    );
}

export default EditVacation;
