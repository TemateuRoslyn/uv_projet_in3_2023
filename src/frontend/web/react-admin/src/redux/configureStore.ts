import { createStore, combineReducers } from "redux";

// Reducers functions 
    import EnvironmentReducer from "./Reducers/EnvironmentReducer";
import IsLOggedReducer from "./Reducers/IsLOggedReducer";
import UserReducer from "./Reducers/UserReducer";
import { ConfigurationParameters } from "../generated";
import TokenReducer from "./Reducers/TokenReducer";


export interface ReduxProps {
    user?: any;
    environment?: ConfigurationParameters,
    loggedIn?: boolean;
    access_token?: string;
}

/**
 * On combine tous les Reducteur de l'aplication
 */
const rootReducer = combineReducers({
    user: UserReducer,
    environment: EnvironmentReducer,
    loggedIn: IsLOggedReducer, 
    access_token: TokenReducer
}) 

/**
 * 
 * @returns Creation du store de redux 
 */
const configureStore = () => {
    return createStore(rootReducer);
}

/**
 * on export notre magazin
 */
export default configureStore;

