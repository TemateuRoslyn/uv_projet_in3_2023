import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumb';
import { Professeur } from '../../generated/models';
import { ReduxProps } from '../../redux/configureStore';
import { TOKEN_LOCAL_STORAGE_KEY } from '../../constants/LOCAL_STORAGE';
import { ProfesseursApi } from '../../generated';

import { 
  SuccessNotification,
  DangerNotification,
  WarningNotification,
 } from '../../services/Notification.service';
import DisplayProfesseurs from './components/DisplayProfesseurs';


const Professeurs = () => {

  const state = useSelector((state: ReduxProps) => state);
  const [professeurs, setProfesseurs] = useState<Professeur[]>([]);
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
    const professeursApi = new ProfesseursApi({...state.environment, accessToken: apiParams});

    setIsLoading(true)
    
    professeursApi.professeursIndex('Bearer ' + apiParams)
    .then((response) => {  
      if(response && response.data){        
        if(response.data.success === true){ setProfesseurs(response.data.content) }
      }
    })
    .catch((error) => {
      alert(error?.response?.data?.message)
    })
    .finally(() => {
      setIsLoading(false)
    });   
  }, []);
  
  return (
    <DefaultLayout>

        {showSuccessNotif && <SuccessNotification message={successNotifMessage} description={successNotifDescription} /> }
        {showDangerNotif && <DangerNotification message={dangerNotifMessage} description={dangerNotifDescription}  />}
        {showWarning && <WarningNotification message={warningNotifMessage} description={warningNotifDescription}  />}

        <Breadcrumb pageName="Professeurs" />
        <DisplayProfesseurs  
          professeurs={professeurs} 
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
          />
    </DefaultLayout>
  );
};

export default Professeurs;
