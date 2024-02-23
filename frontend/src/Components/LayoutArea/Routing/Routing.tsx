import "./Routing.css";
import { Redirect, Route, Switch } from "react-router";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import VacationList from "../../VacationArea/VacationList/VacationList";
import Logout from "../../AuthArea/Logout/Logout";
import AddVacation from "../../VacationArea/AddVacation/AddVacation";
import EditVacation from "../../VacationArea/EditVacation/EditVacation";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Switch>
                 <Route path="/register" component={Register} exact />
                 <Route path="/login" component={Login} exact />
                 <Route path="/logout" component={Logout} exact />
                 <Route path="/vacation" component={VacationList} exact />
                 <Route path="/vacation/add/" component={AddVacation} exact />
                 <Route path="/vacation/edit/:id([0-9]+)" component={EditVacation} exact />

                 <Redirect from="/" to="/login" exact />
                 

            </Switch>
			
        </div>
    );
}

export default Routing;
