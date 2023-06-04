import { 
    USER_INIT_RDX,
    SET_USER__RDX,
    
} from "../Constants/ConstantsRedux"


export const initUserActionAction = (value: any) =>{
    return {
        type: USER_INIT_RDX,
        value: value
    }
}

export const setUserAction = (value: any) =>{
    return {
        type: SET_USER__RDX,
        value: value,
    }
}


