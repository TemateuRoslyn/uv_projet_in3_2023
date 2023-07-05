import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumb';
import { SanctionPrevu } from '../../generated/models';
import { ReduxProps } from '../../redux/configureStore';
import { TOKEN_LOCAL_STORAGE_KEY } from '../../constants/LOCAL_STORAGE';
import { SanctionprevusApi } from '../../generated';

import {
  SuccessNotification,
  DangerNotification,
  WarningNotification,
} from '../../services/Notification.service';
import DisplaySanctionPrevus from './components/DisplaySanctionPrevus';

const SanctionPrevus = () => {
  const state = useSelector((state: ReduxProps) => state);
  const [sanctionPrevus, setSanctionPrevus] = useState<SanctionPrevu[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    const sanctionPrevusApi = new SanctionprevusApi({
      ...state.environment,
      accessToken: apiParams,
    });

    setIsLoading(true);

    sanctionPrevusApi
      .sanctionprevusIndex('Bearer ' + apiParams)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            setSanctionPrevus(response.data.content);
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

      <Breadcrumb pageName="SanctionPrevus" />
      <DisplaySanctionPrevus
        sanctionPrevus={sanctionPrevus}
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

export default SanctionPrevus;
