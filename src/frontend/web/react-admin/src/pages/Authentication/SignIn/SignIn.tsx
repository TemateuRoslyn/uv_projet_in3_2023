import { Link } from 'react-router-dom';
import LogoDark from '../../../images/logo/logo-dark.svg';
import Logo from '../../../images/logo/logo.svg';

import PhoneSVG from './components/PhoneSVG';
import EmailSVG from './components/EmailSVG';
import PasswordSVG from './components/PasswordSVG';
import SubmitBtnSVG from './components/SubmitBtnSVG';

import { useEffect, useState } from 'react';
import { AuthApi } from '../../../generated';
import { AuthLoginBody } from '../../../generated/models';
import Indicator from '../components/Indicator';

import { 
  connect, 
  useSelector,
  useDispatch,
 } from 'react-redux'

import { ReduxProps } from '../../../redux/configureStore';

import { IS_LOGGED_LOCAL_STORAGE_KEY } from '../../../constants/LOCAL_STORAGE';
import { USER_LOCAL_STORAGE_KEY } from '../../../constants/LOCAL_STORAGE';
import { TOKEN_LOCAL_STORAGE_KEY } from '../../../constants/LOCAL_STORAGE';
import { setIsLOggedAction } from '../../../redux/Actions/LoggedInAction';
import { setTokenAction } from '../../../redux/Actions/TokenAction';

import "../../../index.css"

interface SignInProps {}


const SignIn: React.FC<SignInProps> = (props) => {
  

  // redux states
  const state = useSelector((state: ReduxProps) => state);
  const dispatch = useDispatch()

  // component states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [showotif, setShowNotif] = useState(false);
  const [access_token, setAcessToken] = useState('');
  const [store_user, setAaccessUser] = useState('');
  

  useEffect(() => {
    console.log("UseEffect");
    if (isLogedIn === true) {
      localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, access_token);
      localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(store_user));
      localStorage.setItem(IS_LOGGED_LOCAL_STORAGE_KEY, ''+isLogedIn);
      dispatch(setTokenAction(access_token)); // on propage le token dans redux
      dispatch(setIsLOggedAction(true)); // on force le parent à se mettre à jour
      console.log("IS Loggin UseEffect");
    }
  }, [isLogedIn, dispatch]);


  const handleUsernameChange = (event: any) => setUsername(event.target.value);
  const handlePasswordChange = (event: any) => setPassword(event.target.value);

  const handleSubmit = (event: any) => {

    const authApi = new AuthApi(state.environment);

    const apiParams: AuthLoginBody = {
      username: username,
      password: password,
      persistent: false,
    }

    setIsLoading(true)

    authApi.authLogin(apiParams)
    .then((response) => {
      

      setIsLoading(false)      
      if(response && response.data){

        if(response.data.success === true){
          const token_r = response?.data?.content?.token
          const user_r = response?.data?.content?.user          
          setAcessToken(token_r)
          setAaccessUser(user_r)
          setIsLogedIn(true)

        }else if(response.data.success === false){
          setIsLogedIn(false)
          setShowNotif(true)
        }
      }
      
    })
    .catch((error) => {
      alert('Error')
          })
    .finally(() => {
      setIsLoading(false)
    });
    

  };

  return (
    <div className='w-full h-full no-scrollbar'>
      <div className="no-scrollbar rounded-sm mx-[15%] my-[5.5%] align-items-center justify-center justify-content-center border border-stroke bg-white shadow-xl shadow-graydark dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center h-full">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="hidden dark:block" src={Logo} alt="Logo" />
                <img className="dark:hidden" src={LogoDark} alt="Logo" />
              </Link>

              <p className="2xl:px-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                suspendisse.
              </p>
              <PhoneSVG />
            </div>
          </div>
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Welcome back</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to SchoolAdmin
              </h2>
              <form>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={handleUsernameChange}
                      placeholder="Enter your username"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <EmailSVG/>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="6+ Characters, 1 Capital letter"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <PasswordSVG/>
                  </div>
                </div>

                <div className="mb-5">
                  {isLoading && (<Indicator widtf={8} height={8} border='primary'/>)}
                  <input
                    onClick={handleSubmit}
                    type="submit"
                    value="Sign In"
                    disabled={isLoading}
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>

                <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                  <SubmitBtnSVG/>
                  Sign in with Google
                </button>

                <div className="mt-6 text-center">
                  <p>
                    Don’t have any account?{' '}
                    <Link to="/auth/signup" className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};


function mapStateToProps(state: ReduxProps): ReduxProps {
  return { 
      user: state.user,
      environment: state.environment,
      loggedIn: state.loggedIn,
      access_token: state.access_token,
  };
} 
export default connect(mapStateToProps)(SignIn)

