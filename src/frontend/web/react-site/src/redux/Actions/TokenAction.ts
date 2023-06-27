import { SET_TOKEN_RDX } from "../Constants/ConstantsRedux"

export const setTokenAction = (value: string) =>{
    return {
        type: SET_TOKEN_RDX,
        value: value,
    }
}


