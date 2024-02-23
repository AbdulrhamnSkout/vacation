import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthActionType } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notify";
import socket from "../../../Services/Socket.io";


function Logout(): JSX.Element {
    const history = useHistory();
    useEffect(() => {
        store.dispatch({ type: AuthActionType.UserLoggedOut });
        notify.success("You are now logged out.");
        if(socket.socket!==null){
            socket.socket.disconnect()
             socket.socket =null
    }
        history.push("/login");
    });
    return null;
}

export default Logout;
