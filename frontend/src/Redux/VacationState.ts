import Vacation from "../Models/Vacation";

export  class VacationsState{
    public vacations:Vacation []=[]
}

export enum VacationActionType{
    VacationsDownloaded = "VacationsDownloaded",
    VacationAdded = "VacationAdded",
    VacationUpdated = "VacationUpdated",
    VacationDeleted = "VacationDeleted",
    VacationFollow="VacationFollow"
}

export interface VacationsAction {
    type: VacationActionType; 
    payload: any;            
}

export function vacationsReducer(currentState: VacationsState = new VacationsState(), action: VacationsAction): VacationsState {

    // Create a copy of the currentState:
    const newState = { ...currentState }; // ... is JS Spread Operator
    let i =-1
    // Perform the action: 
    switch (action.type) {
        case VacationActionType.VacationsDownloaded:
            newState.vacations = action.payload; // Here action.payload MUST be the downloaded products array!
            break;
        case VacationActionType.VacationAdded:
            if(newState.vacations===null){
                newState.vacations=[action.payload]
                break
            }
            else{
            newState.vacations.push(action.payload); // Here action.payload MUST be the added product!
            break;
        }

        case VacationActionType.VacationFollow:
            i=newState.vacations.findIndex(v=> v.vacationId===action.payload.id)
            if(i!==-1){
                newState.vacations[i].followers = newState.vacations[i].followers + action.payload.num
            }
            break;
        case VacationActionType.VacationUpdated:
            i=newState.vacations.findIndex(v=> v.vacationId===action.payload.vacationId)
            if(i!==-1){
                newState.vacations[i]= action.payload
            }
            break;            
        case VacationActionType.VacationDeleted:
            newState.vacations=newState.vacations.filter(v=>v.vacationId !== action.payload.vacationId)
            break;
    }

    // Return the new state: 
    return newState;
}

