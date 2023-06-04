import { 
    IS_LOGGED_LOCAL_STORAGE_KEY, 
    TOKEN_LOCAL_STORAGE_KEY, 
    USER_LOCAL_STORAGE_KEY,
} from "../constants/LOCAL_STORAGE";
import { AuthApi } from "../generated";
import environment from "../environments/environment";

const LogoutComponent = () => {
    const authApi = new AuthApi(environment);
    const token : string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    authApi.authLogout('Bearer '+ token)
    .then((response) => {
        console.log(response);
      if(response && response.data){
          localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
          localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
          localStorage.removeItem(IS_LOGGED_LOCAL_STORAGE_KEY);
      }
    })
    .catch((error) => { })
    .finally(() => {
        console.log('finall');
    });
    return null;
}

export default LogoutComponent   