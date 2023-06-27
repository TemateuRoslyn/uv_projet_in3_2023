import { 
    IS_LOGGED_INIT_RDX,
    SET_IS_LOGGED__RDX,
    
} from "../Constants/ConstantsRedux"


export const initIsLOggedAction = (value: boolean) =>{
    return {
        type: IS_LOGGED_INIT_RDX,
        value: false
    }
}

export const setIsLOggedAction = (value: boolean) =>{
    return {
        type: SET_IS_LOGGED__RDX,
        value: value,
    }
}


