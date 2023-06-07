import { Link } from 'react-router-dom';
import LogoDark from '../../../images/logo/logo-dark.svg';
import Logo from '../../../images/logo/logo.svg';

import PhoneSVG from './components/EmailSVG';
import EmailSVG from './components/EmailSVG';
import PasswordSVG from './components/PasswordSVG';
import SubmitBtnSVG from './components/SubmitBtnSVG';

import { useState } from 'react';
import { AuthApi, ConfigurationParameters } from '../../../generated';
import { AuthLoginBody } from '../../../generated/models';
import Indicator from '../components/Indicator';


interface SignInProps {
  setEnvironment: (newEnv: ConfigurationParameters, loggedIn: boolean, user: any) => void;
  environment: ConfigurationParameters,
}


const SignIn: React.FC<SignInProps> = (props) => {
  

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [showotif, setShowNotif] = useState(false);

  const handleUsernameChange = (event: any) => setUsername(event.target.value);
  const handlePasswordChange = (event: any) => setPassword(event.target.value);

  const handleSubmit = (event: any) => {

    const authApi = new AuthApi(props.environment);

    const datas: AuthLoginBody = {
      username: username,
      password: password,
      persistent: false,
    }

    setIsLoading(true)

    authApi.authLogin(datas)
    .then((response) => {
      setIsLoading(false)
      if(response && response.data){
        const env = {...props.environment,
          accessToken: response?.data?.content?.token ? response.data.content.token : '',
          username: username,
          password: password
        }
        if(response.data.success === true){
          setIsLogedIn(true)
          props.setEnvironment(env, isLogedIn, response.data.content.user)
        }else if(response.data.success === false){
          setIsLogedIn(false)
          setShowNotif(true)
        }
      }
      
    })
    .catch((error) => {
      alert(error.message);
    })
    .finally(() => {
      setIsLoading(false)
      // Code à exécuter dans la clause 'finally'
    });
    

  };

  return (
    // <DefaultLayout>
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
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
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to TailAdmin
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
                    Re-type Password
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
                  {isLoading && (<Indicator/>)}
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

export default SignIn;
