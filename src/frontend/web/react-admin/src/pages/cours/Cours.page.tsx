import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumb';
import DisplayCours from './components/DisplayCours';
import { Cour } from '../../generated/models';
import { ReduxProps } from '../../redux/configureStore';
import { IS_LOGGED_LOCAL_STORAGE_KEY, TOKEN_LOCAL_STORAGE_KEY, USER_LOCAL_STORAGE_KEY } from '../../constants/LOCAL_STORAGE';
import { AuthApi, CoursApi } from '../../generated';

import { 
  SuccessNotification,
  DangerNotification,
  WarningNotification,
} from '../../services/Notification.service';
import { setIsLOggedAction } from '../../redux/Actions/LoggedInAction';
import { TOKEN_EXPIRED } from '../../constants/RESPONSES_CODE';


const CoursPage = () => {

  const dispatch = useDispatch()


  const state = useSelector((state: ReduxProps) => state);
  const [cours, setCours] = useState<Cour[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showSuccessNotif, setShowSuccessNotif] = useState<boolean>(false);
  const [successNotifMessage, setSuccessNotifMessage] = useState<string>('');
  const [successNotifDescription, setSuccessNotifDescription] = useState<string | null>(null);
  
  const [showDangerNotif, setShowDangerNotif] = useState<boolean>(false);
  const [dangerNotifMessage, setDangerNotifMessage] = useState<string>('');
  const [dangerNotifDescription, setDangerNotifDescription] = useState<string | null>(null);
  
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [warningNotifMessage, setWarningMessage] = useState<string>('');
  const [warningNotifDescription, setWarningNotifDescription] = useState<string | null>(null);


  useEffect(() => {  
    const apiParams: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    const coursApi = new CoursApi({...state.environment, accessToken: apiParams});

    setIsLoading(true);
    
    coursApi.findAllcours('Bearer ' + apiParams)
      .then((response) => {  
        if (response && response.data) {        
          if (response.data.success === true) {
            setCours(response.data.content);
            console.log(response.data);
          }
        }
      })
      .catch((error) => {
        if(error?.response?.status === TOKEN_EXPIRED.status && error?.response?.data?.message === TOKEN_EXPIRED.data.message){
          setTokenExpired()
        } else {
          alert(error?.response?.data?.message)
        }
      })
      .finally(() => {
        setIsLoading(false);
      });   
  }, []);

  const logout = () => {
    const authApi = new AuthApi(state.environment);
    const token : string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    authApi.authLogout('Bearer '+ token)
    .then((response) => {})
    .catch((error) => {})
    .finally(() => {
      localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
      localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
      localStorage.removeItem(IS_LOGGED_LOCAL_STORAGE_KEY);
      dispatch(setIsLOggedAction(false));
    });
  };

  const setTokenExpired = () => {
    
    setWarningMessage(TOKEN_EXPIRED.response.message)
    setWarningNotifDescription(TOKEN_EXPIRED.response.description)
    setShowWarning(true)
    
    //  notification + 3s
    setTimeout(() => {
      logout()
    }, 6000);
  };
  
  return (
    <DefaultLayout>
      {showSuccessNotif && <SuccessNotification message={successNotifMessage} description={successNotifDescription} />}
      {showDangerNotif && <DangerNotification message={dangerNotifMessage} description={dangerNotifDescription} />}
      {showWarning && <WarningNotification message={warningNotifMessage} description={warningNotifDescription} />}

      <Breadcrumb pageName="Cours" />
      <DisplayCours
        cours={cours}
        isLoading={isLoading}
        setShowSuccessNotif={setShowSuccessNotif}
        setSuccessNotifMessage={setSuccessNotifMessage}
        setSuccessNotifDescription={setSuccessNotifDescription}
        
        setShowDangerNotif={setShowDangerNotif}
        setDangerNotifMessage={setDangerNotifMessage}
        setDangerNotifDescription={setDangerNotifDescription}
        
        setShowWarning={setShowWarning}
        setWarningMessage={setWarningMessage}
        setWarningNotifDescription={setWarningNotifDescription}

        setTokenExpired={setTokenExpired}

      />
    </DefaultLayout>
  );
};

export default CoursPage;
