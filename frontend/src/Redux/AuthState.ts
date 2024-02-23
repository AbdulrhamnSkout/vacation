import User from "../Models/User";

// Auth State: 
export class AuthState {
    public user: User = null;
    
}

// Auth Action Types: 
export enum AuthActionType {
    UserRegistered = "UserRegistered",
    UserLoggedIn = "UserLoggedIn",
    UserLoggedOut = "UserLoggedOut"
}

// Auth Action: 
export interface AuthAction {
    type: AuthActionType;
    payload?: any; // Here payload is optional because we have no data on UserLoggedOut.
}

// Auth Reducer: 
export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState };
    switch(action.type) {
        case AuthActionType.UserRegistered: 
        case AuthActionType.UserLoggedIn:
            newState.user = action.payload; // Here action.payload is a UserModel object sent from backend.
            break;
        case AuthActionType.UserLoggedOut:
            newState.user = null; // Here we don't have action.payload.
            break;
    }
    return newState;
}

