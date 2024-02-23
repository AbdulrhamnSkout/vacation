import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import Vacation from "../../../Models/Vacation";
import store from "../../../Redux/Store";
import { VacationActionType } from "../../../Redux/VacationState";
import notify from "../../../Services/Notify";
import "./AddVacation.css";
import {io} from "socket.io-client"
import jwtAxios from "../../../Services/jwtAxios";
import { useEffect } from "react";

function AddVacation(): JSX.Element {
    const { id } = useParams<{ id: string }>()
    const parm = +id
    console.log(parm)
    const { register, handleSubmit, formState } = useForm<Vacation>()
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
            const response = await jwtAxios.post<Vacation>("http://localhost:3001/api/vacation", myFormData)
            console.log("here")
            console.log(response.data )
            store.dispatch({ type: VacationActionType.VacationAdded, payload: response.data })
            const socket =  io("http://localhost:3001")
            socket.emit("admin-update","")
            setTimeout(()=> socket.disconnect(),100)
            notify.success("added success ")
            history.push("/vacation")


        }
        catch (err) {
            notify.error(err)
        }

    }




    return (
        <div className="AddVacation">
            <form onSubmit={handleSubmit(send)}>
                <label>description</label>
                <textarea  {...register("description", { required: true })} />
                {formState.errors.description && <span>missing description </span>}
                <br />
                <label>destination</label>
                <input type="text"  {...register("destination", { required: true })} />
                {formState.errors.destination && <span>missing destination</span>}
                <br />
                <label>price</label>
                <br />
                <input type="number"  {...register("price", { required: true })} />
                {formState.errors.price && <span>missing price</span>}
                <br />
                <label>start</label>
                <input type="date"  {...register("start", { required: true })} />
                {formState.errors.start && <span>missing start</span>}
                <br />
                <label>end</label>
                <input type="date"  {...register("end", { required: true })} />
                {formState.errors.end && <span>missing end</span>}
                <br />
                <label>image</label>
                <input type="file" accept="image/*"  {...register("image", { required: true })} />
                {formState.errors.image && <span>missing image</span>}
                <br />
                <Button type="submit" variant="success">send</Button>
            </form>
        </div>
    );
}

export default AddVacation;
