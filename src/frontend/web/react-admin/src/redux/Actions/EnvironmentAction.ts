import { 
    ENVIRONMENT_INIT_RDX,
    SET_ENVIRONMENT_API_KEY_RDX,
    SET_ENVIRONMENT_USERNAME_RDX,
    SET_ENVIRONMENT_PASSWORD_RDX,
    SET_ENVIRONMENT_ACCESS_TOKEN_RDX,
    SET_ENVIRONMENT_BASE_PATH_RDX,
    SET_ENVIRONMENT_BASE_OPETIONS_RDX,
    
} from "../Constants/ConstantsRedux"


export const initIsLOggedAction = (value: boolean) =>{
    return {
        type: ENVIRONMENT_INIT_RDX,
        value: false
    }
}
export const setEnvironmentAPIKeyAction = (value: string) =>{
    return {
        type: SET_ENVIRONMENT_API_KEY_RDX,
        value: value
    }
}
export const setEnvironmentPasswordAction = (value: string) =>{
    return {
        type: SET_ENVIRONMENT_PASSWORD_RDX,
        value: value
    }
}
export const setEnvironmentUsernameAction = (value: string) =>{
    return {
        type: SET_ENVIRONMENT_USERNAME_RDX,
        value: value
    }
}
export const setEnvironmentAccessTokenAction = (value: string) =>{
    return {
        type: SET_ENVIRONMENT_ACCESS_TOKEN_RDX,
        value: value,
    }
}
export const setEnvironmentBasePathAction = (value: string) =>{
    return {
        type: SET_ENVIRONMENT_BASE_PATH_RDX,
        value: value
    }
}
export const setEnvironmentBaseOptionsAction = (value: any) =>{
    return {
        type: SET_ENVIRONMENT_BASE_OPETIONS_RDX,
        value: value
    }
}


