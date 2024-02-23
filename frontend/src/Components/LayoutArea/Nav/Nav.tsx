import "./Nav.css";
import imgUrl from "../../../Asset/images/vacation.png"
import { NavLink } from "react-router-dom";
import store from "../../../Redux/Store";
import { useEffect, useState } from "react";



function Nav(): JSX.Element {
    
    const [name,updateName]=useState<string>(store.getState().authState.user===null ? "guest"  : store.getState().authState.user.firstName)
 
    useEffect(()=>{
        store.subscribe(()=>{
            updateName(store.getState().authState.user===null ? "guest"  : store.getState().authState.user.firstName)
        })

    })
 
    return (
        <nav className="Nav">
            <img src={imgUrl} alt="" />
            <ul>

                {store.getState().authState.user === null && <>
                    <span>{"welcome " +name} </span>
                    <NavLink to="/login">  <li>  Login </li></NavLink>
                    <NavLink to="/register"><li>  Register </li> </NavLink>
                    
                </>
                }

                { store.getState().authState.user !== null &&  <>
                    <span>{"welcome " + name} </span>
                    <NavLink to="/logout"> <li>   Logout </li> </NavLink>
                    <NavLink to="/vacation"><li>  Vacation  </li></NavLink>
                    
                </>
                }
            </ul>


        </nav>
    );
}

export default Nav;
