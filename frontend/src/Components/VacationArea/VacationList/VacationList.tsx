import { Component } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router";
import { Unsubscribe } from "redux";
import Vacation from "../../../Models/Vacation";
import store from "../../../Redux/Store";
import { VacationActionType } from "../../../Redux/VacationState";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import VacationCard from "../Card/VacationCard";
import "./VacationList.css";

interface VacationListState {
    vacation: Vacation[]
    to: string;
}





class VacationList extends Component<{}, VacationListState> {
    public whatIFollow: { vacationId: number }[] = [];
    public unsubscribeMe: Unsubscribe
    public constructor(prop: {}) {
        super(prop)
        this.state = { to: "", vacation: [] }
    }

    private addVacation = () => {
        this.setState({ to: "/vacation/add", vacation: this.state.vacation })
    }

    public async componentDidMount() {

        this.unsubscribeMe = store.subscribe(() => {
            console.log("run")
            this.setState({ vacation: store.getState().vacationState.vacations, to: this.state.to });
        });


        const user = store.getState().authState.user

        if (!user) {
            notify.error("you are not logged in")
            this.setState({ to: "/login", vacation: this.state.vacation })
            return
        }
        if (user.isAdmin === 0) {
            this.whatIFollow =  (await jwtAxios.get<{ vacationId: number }[]>("http://localhost:3001/api/followers/follow/" + user.userId)).data
        }
        if (store.getState().vacationState.vacations?.length === 0) {
            try {
                const response = await jwtAxios.get("http://localhost:3001/api/vacation")
                store.dispatch({ type: VacationActionType.VacationsDownloaded, payload: response.data })
            }
            catch (err) {
                notify.error(err)
            }

        }
        this.setState({ to: this.state.to, vacation: store.getState().vacationState.vacations })
    }

    public componentWillUnmount(): void {
        this.unsubscribeMe();
    }



    public render(): JSX.Element {
        if (this.state.to !== "") {
            return <Redirect from="*" to={this.state.to} exact />
        }


        return (

            <div className="VacationList">
                {store.getState().authState?.user?.isAdmin === 1 && <Button onClick={this.addVacation} variant="primary">add vacation</Button>}

                <div className="list">
                    {this.state.vacation?.map(v => <VacationCard key={v.vacationId} vacation={v} arr={this.whatIFollow} />)}
                </div>
            </div>
        );
    }
}

export default VacationList;
