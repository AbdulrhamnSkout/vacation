import axios from "axios";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { io } from "socket.io-client";
import CredentialsModel from "../../../Models/CredentialsModel";
import User from "../../../Models/User";
import Vacation from "../../../Models/Vacation";
import { AuthActionType } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import { VacationActionType } from "../../../Redux/VacationState";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import socket from "../../../Services/Socket.io";
import "./Login.css";


function Login(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<CredentialsModel>()
    const history = useHistory()

    async function send(credentials: CredentialsModel) {
        try {
            const response = await axios.post<User>("http://localhost:3001/api/auth/login", credentials);
            store.dispatch({ type: AuthActionType.UserLoggedIn, payload: response.data });
            console.log(response.data)
            console.log(store.getState().authState)
            notify.success("You are now logged in.");
            if (response.data.isAdmin === 0 && socket.socket ===null) {
                socket.socket = io("http://localhost:3001")
                socket.socket.on("refresh-your-data", async () => {
                    console.log("get data form server")
                    const response= await jwtAxios.get<Vacation[]>("http://localhost:3001/api/vacation")
                    store.dispatch({type:VacationActionType.VacationsDownloaded,payload:response.data})
                })
            }
            history.push("/vacation");

        }
        catch (err) {
            notify.error(err)
        }

    }


    return (
        <div className="Login">
            <form onSubmit={handleSubmit(send)}>
                <h3>Welcome</h3>
                <input placeholder="username" type="text" {...register("username", { required: true })} />
                {formState.errors.username && <span>Missing username.</span>}

                <input placeholder="password" type="password" {...register("password", { required: true })} />
                {formState.errors.password && <span>Missing password.</span>}

                <Button type="submit" variant="success">Login</Button>

            </form>


        </div>
    );
}

export default Login;
