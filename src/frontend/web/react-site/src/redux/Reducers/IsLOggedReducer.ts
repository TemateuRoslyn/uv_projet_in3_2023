import { 
    IS_LOGGED_INIT_RDX,
    SET_IS_LOGGED__RDX,
    
} from "../Constants/ConstantsRedux"


const initState =  false;

function IsLOggedReducer (state = initState, action: any){
    switch(action.type) {

    case IS_LOGGED_INIT_RDX:
        return false;

    case SET_IS_LOGGED__RDX:
        return action.value
   
    default: 
    return state;
    }
}

export default IsLOggedReducer; 