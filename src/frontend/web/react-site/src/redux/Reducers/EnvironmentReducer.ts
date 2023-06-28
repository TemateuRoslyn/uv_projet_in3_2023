import { ConfigurationParameters } from "../../generated";
import environment from "../../environments/environment";

import { 
    SET_ENVIRONMENT_API_KEY_RDX,
    SET_ENVIRONMENT_USERNAME_RDX,
    SET_ENVIRONMENT_PASSWORD_RDX,
    SET_ENVIRONMENT_ACCESS_TOKEN_RDX,
    SET_ENVIRONMENT_BASE_PATH_RDX,
    SET_ENVIRONMENT_BASE_OPETIONS_RDX,
    
} from "../Constants/ConstantsRedux"


const initState: ConfigurationParameters =  environment;

function EnvironmentReducer (state = initState, action: any){
    switch(action.type) {

    case SET_ENVIRONMENT_API_KEY_RDX:
        return {
            ...state,
            apiKey: action.value
        }
    case SET_ENVIRONMENT_USERNAME_RDX:
        return {
            ...state,
            username: action.value
        }
    case SET_ENVIRONMENT_PASSWORD_RDX:
        return {
            ...state,
            password: action.value
        }
    case SET_ENVIRONMENT_ACCESS_TOKEN_RDX:
        return {
            ...state,
            accessToken: action.value
        }
    case SET_ENVIRONMENT_BASE_PATH_RDX:
        return {
            ...state,
            basePath: action.value
        }
    case SET_ENVIRONMENT_BASE_OPETIONS_RDX:
        return {
            ...state,
            baseOptions: action.value
        }   
   
    default: 
    return state;
    }
}

export default EnvironmentReducer; 