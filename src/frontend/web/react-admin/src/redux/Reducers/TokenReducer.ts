import { SET_TOKEN_RDX } from "../Constants/ConstantsRedux"


const initState =  false;

function TokenReducer (state = initState, action: any){
    switch(action.type) {
    case SET_TOKEN_RDX:
        return action.value
   
    default: 
    return state;
    }
}

export default TokenReducer; 