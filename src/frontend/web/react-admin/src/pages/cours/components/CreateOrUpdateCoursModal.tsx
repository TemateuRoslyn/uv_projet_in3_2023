import { useEffect, useState } from 'react';
import { MODAL_MODE } from '../../../constants/ENUM';
import { EditIcon, NewIcon } from '../../../components/Icone';
import {
  Cours,
  CoursCreateBody,
  UpdateCoursIdBody,
} from '../../../generated/models';
import { TOKEN_LOCAL_STORAGE_KEY } from '../../../constants/LOCAL_STORAGE';
import { CoursApi } from '../../../generated';
import { useSelector } from 'react-redux';
import { ReduxProps } from '../../../redux/configureStore';
import Indicator from '../../Authentication/components/Indicator';

interface ModalProps {
  mode: MODAL_MODE;
  title: string;
  onClose: () => void;
  refresh?: () => void;
  item?: Cours | null;

  setShowSuccessNotif: (value: boolean) => void;
  setSuccessNotifMessage: (value: string) => void;
  setSuccessNotifDescription: (value: string | null) => void;

  setShowWarning: (value: boolean) => void;
  setWarningMessage: (value: string) => void;
  setWarningNotifDescription: (value: string | null) => void;
}

const CreateOrUpdateCoursModal: React.FC<ModalProps> = (props) => {
  const state = useSelector((state: ReduxProps) => state);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [libelle, setLibelle] = useState<string>(
    props.item ? props.item.libelle : ''
  );
  const [dateCour, setDateCour] = useState<string>(
    props.item ? props.item.date_cour : ''
  );
  const [heureDebut, setHeureDebut] = useState<string>(
    props.item ? props.item.heure_debut : ''
  );
  const [heureFin, setHeureFin] = useState<string>(
    props.item ? props.item.heure_fin : ''
  );

  const handleLibelleChange = (event: any) => setLibelle(event.target.value);
  const handleDateCourChange = (event: any) => setDateCour(event.target.value);
  const handleHeureDebutChange = (event: any) =>
    setHeureDebut(event.target.value);
  const handleHeureFinChange = (event: any) => setHeureFin(event.target.value);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        props.onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [props]);

  const handleCreate = (_event: any) => {
    _event.preventDefault();

    const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    const coursApi = new CoursApi({ ...state.environment, accessToken: token });

    setIsLoading(true);

    const apiParams: CoursCreateBody = {
      libelle: libelle,
      dateCour: dateCour,
      heureDebut: heureDebut,
      heureFin: heureFin,
    };
    console.log(apiParams);
    coursApi
      .createCours(apiParams, 'Bearer ' + token)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            props.onClose();
            if (props.refresh) props.refresh();

            props.setSuccessNotifMessage(response.data.message);
            props.setSuccessNotifDescription(
              'A new course has been successfully created!'
            );
            props.setShowSuccessNotif(true);
          }
        }
      })
      .catch((error) => {
        alert(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);

        setTimeout(() => {
          props.setShowSuccessNotif(false);
        }, 3000);
      });
  };

  const handleUpdate = (_event: any) => {
    _event.preventDefault();

    const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    const coursApi = new CoursApi({ ...state.environment, accessToken: token });

    setIsLoading(true);

    const apiParams: UpdateCoursIdBody = {
      id: props.item?.id,
      libelle: libelle,
      date_cour: dateCour,
      heure_debut: heureDebut,
      heure_fin: heureFin,
    };

    coursApi
      .updateCours(apiParams, 'Bearer ' + token, props.item?.id)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            props.onClose();
            if (props.refresh) props.refresh();

            props.setSuccessNotifMessage(response.data.message);
            props.setSuccessNotifDescription(
              'This course has been successfully updated!'
            );
            props.setShowSuccessNotif(true);
          }
        }
      })
      .catch((error) => {
        alert(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);

        setTimeout(() => {
          props.setShowSuccessNotif(false);
        }, 3000);
      });
  };

  return (
    <div
      id="authentication-modal"
      className="authentication-modal pl-800 pt-20"
      onClick={props.onClose}
    >
      <div
        className="modal-container top-modal-animation relative mx-auto items-center  justify-center  "
        onClick={(event) => event.stopPropagation()}
      >
        <div className="rounded-sm border border-stroke bg-white bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <button onClick={props.onClose} className="close-button">
            <svg
              aria-hidden="true"
              className="close-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="modal-body">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h2 className=" modal-title font-medium text-black dark:text-white">
                {props.title}
              </h2>
            </div>
            <form className="modal-form">
              <div className="form-group">
                <label
                  htmlFor="libelle"
                  className="form-label form-class mb-2.5 block text-black dark:text-white"
                >
                  Libelle
                </label>
                <input
                  type="text"
                  id="libelle"
                  value={libelle}
                  disabled={props.mode === MODAL_MODE.view}
                  onChange={handleLibelleChange}
                  placeholder="Enter a course libelle"
                  className={`form-input form-class w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black ${
                    props.mode === MODAL_MODE.view ? 'disabled-input' : ''
                  }`}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="dateCour"
                  className="form-label form-class mb-2.5 block text-black dark:text-white"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date_cour"
                  value={dateCour}
                  disabled={props.mode === MODAL_MODE.view}
                  onChange={handleDateCourChange}
                  className={`form-input form-class w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black ${
                    props.mode === MODAL_MODE.view ? 'disabled-input' : ''
                  }`}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="heureDebut"
                  className="form-label form-class mb-2.5 block text-black dark:text-white"
                >
                  Heure de début
                </label>
                <input
                  type="date"
                  id="heure_debut"
                  value={heureDebut}
                  disabled={props.mode === MODAL_MODE.view}
                  onChange={handleHeureDebutChange}
                  className={`form-input form-class w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black ${
                    props.mode === MODAL_MODE.view ? 'disabled-input' : ''
                  }`}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="heureFin"
                  className="form-label form-class mb-2.5 block text-black dark:text-white"
                >
                  Heure de fin
                </label>
                <input
                  type="date"
                  id="heure_fin"
                  value={heureFin}
                  disabled={props.mode === MODAL_MODE.view}
                  onChange={handleHeureFinChange}
                  className={`form-input form-class w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black ${
                    props.mode === MODAL_MODE.view ? 'disabled-input' : ''
                  }`}
                />
              </div>
            </form>
            {props.mode === MODAL_MODE.view ? null : (
              <div className="form-actions bg-green-600">
                <button onClick={props.onClose} className="cancel-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="button-icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Annuler
                </button>

                {props.mode !== MODAL_MODE.view &&
                props.mode === MODAL_MODE.create ? (
                  <button onClick={handleCreate} className="create-button">
                    {isLoading ? (
                      <Indicator height={5} border="white" />
                    ) : (
                      <NewIcon size={2} color="#fff" />
                    )}
                    <span className="ml-2">Créer </span>
                  </button>
                ) : null}
                {props.mode !== MODAL_MODE.view &&
                props.mode === MODAL_MODE.update ? (
                  <button onClick={handleUpdate} className="create-button">
                    <EditIcon color="#fff" size={18} />
                    Enregistrer
                  </button>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrUpdateCoursModal;
