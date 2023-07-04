import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumb';
import DisplayRegle from './components/DisplayRegle';
import { Regle, ReglementInterieur } from '../../generated/models';
import { ReduxProps } from '../../redux/configureStore';
import { TOKEN_LOCAL_STORAGE_KEY } from '../../constants/LOCAL_STORAGE';
import { ReglesApi } from '../../generated';
import { ReglementInterieursApi } from '../../generated/apis/reglement-interieurs-api';
import { 
  SuccessNotification,
  DangerNotification,
  WarningNotification, 
} from '../../services/Notification.service';

const ReglePage = () => {
  const state = useSelector((state: ReduxProps) => state);
  const [regle, setRegle] = useState<Regle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reglementInterieur, setReglementInterieur] = useState<
    ReglementInterieur[]
  >([]);

  const [showSuccessNotif, setShowSuccessNotif] = useState<boolean>(false);
  const [successNotifMessage, setSuccessNotifMessage] = useState<string>('');
  const [successNotifDescription, setSuccessNotifDescription] = useState<
    string | null
  >(null);

  const [showDangerNotif, setShowDangerNotif] = useState<boolean>(false);
  const [dangerNotifMessage, setDangerNotifMessage] = useState<string>('');
  const [dangerNotifDescription, setDangerNotifDescription] = useState<
    string | null
  >(null);

  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [warningNotifMessage, setWarningMessage] = useState<string>('');
  const [warningNotifDescription, setWarningNotifDescription] = useState<
    string | null
  >(null);

  useEffect(() => {
    const apiParams: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    const regleApi = new ReglesApi({...state.environment, accessToken: apiParams});
    const reglementInterieurApi = new ReglementInterieursApi({...state.environment, accessToken: apiParams});
       
    setIsLoading(true);

    regleApi
      .reglesIndex('Bearer ' + apiParams)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            setRegle(response.data.content);
          }
        }
      })
      .catch((error) => {
        alert(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
    reglementInterieurApi
      .reglementInterieursIndex('Bearer' + apiParams)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            setReglementInterieur(response.data.content);
          }
        }
      })
      .catch((error) => {
        alert(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <DefaultLayout>
      {showSuccessNotif && (
        <SuccessNotification
          message={successNotifMessage}
          description={successNotifDescription}
        />
      )}
      {showDangerNotif && (
        <DangerNotification
          message={dangerNotifMessage}
          description={dangerNotifDescription}
        />
      )}
      {showWarning && (
        <WarningNotification
          message={warningNotifMessage}
          description={warningNotifDescription}
        />
      )}

      <Breadcrumb pageName="Regle" />
      <DisplayRegle
        regle={regle}
        isLoading={isLoading}
        reglements={reglementInterieur}
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

export default ReglePage;
