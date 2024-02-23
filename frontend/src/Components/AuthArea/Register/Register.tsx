import "./Register.css";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import User from "../../../Models/User";
import axios from "axios";
import store from "../../../Redux/Store";
import { AuthActionType } from "../../../Redux/AuthState";
import notify from "../../../Services/Notify";
import { useHistory } from "react-router";


function Register(): JSX.Element {
    const { register, handleSubmit,formState } = useForm<User>()
    const history=useHistory()

    async function send(user:User){
        try{
            const response=await axios.post<User>("http://localhost:3001/api/auth/register",user)
            store.dispatch({ type: AuthActionType.UserRegistered, payload: response.data });
            console.log("from reg" , response.data)
            console.log("from reg  stor" , store.getState().authState)
            notify.success("You have been successfully registered")
            history.push("./vacation")
            

        }
        catch(err){
            notify.error(err)
        }
    }

    return (
        <div className="Register">
            <form onSubmit={handleSubmit(send)}>

                <h3>Register </h3>
                <input placeholder="first name" type="text" {...register("firstName", { required: true })} />
                {formState.errors.firstName && <span>Missing first name.</span>}

                <input placeholder="last name" type="text" {...register("lastName", { required: true })} />
                {formState.errors.lastName && <span>Missing last name.</span>}
                
                <input placeholder="username" type="text" {...register("username", { required: true })} />
                {formState.errors.username && <span>Missing username.</span>}

                <input placeholder="password" type="password" {...register("password", { required: true })} />
                {formState.errors.password && <span>Missing password.</span>}

                <Button type="submit" variant="success">Login</Button>
            </form>

        </div>
    );
}

export default Register;
