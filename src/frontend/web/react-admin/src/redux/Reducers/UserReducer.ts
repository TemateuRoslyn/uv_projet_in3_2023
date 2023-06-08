import { 
    USER_INIT_RDX,
    SET_USER__RDX,
    
} from "../Constants/ConstantsRedux"


const initState =  null;

function UserReducer (state = initState, action: any){
    switch(action.type) {

    case USER_INIT_RDX:
        return action.value;

    case SET_USER__RDX:        
        const { setToLocalStorage } = action.payload;
        setToLocalStorage(action.value) //on ajoutte le user au local storage
        return action.value
   
   
    default: 
    return state;
    }
}

export default UserReducer; 