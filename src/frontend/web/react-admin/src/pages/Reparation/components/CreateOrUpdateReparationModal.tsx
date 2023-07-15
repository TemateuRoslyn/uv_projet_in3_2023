import { ChangeEvent, useEffect, useState } from 'react';
import { MODAL_MODE } from '../../../constants/ENUM';
import { EditIcon, NewIcon } from '../../../components/Icone';
import {
  Reparation,
  ReparationsCreateBody,
  Faute,
  
  UpdateReparationIdBody,
} from '../../../generated/models';
import { TOKEN_LOCAL_STORAGE_KEY } from '../../../constants/LOCAL_STORAGE';
import { FautesApi, ReparationsApi } from '../../../generated';
import { useSelector } from 'react-redux';
import { ReduxProps } from '../../../redux/configureStore';
import Indicator from '../../Authentication/components/Indicator';
import CustomSelectInput from '../../../components/CustomSelects/CustomSelectInput';

interface ModalProps {
  mode: MODAL_MODE;
  title: string;
  onClose: () => void;
  refresh?: () => void;
  item?: Reparation | null;
  fautes?: Faute [] | null;

  setShowSuccessNotif: (value: boolean) => void;
  setSuccessNotifMessage: (value: string) => void;
  setSuccessNotifDescription: (value: string | null) => void;

  setShowWarning: (value: boolean) => void;
  setWarningMessage: (value: string) => void;
  setWarningNotifDescription: (value: string | null) => void;
}

const CreateOrUpdateReparationModal: React.FC<ModalProps> = (props) => {
  
  const state = useSelector((state: ReduxProps) => state);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const [demarcheMediation, setDemarcheMediation] = useState<string>(
  //   props.item ? props.item.demarcheMediation : ''
  // );
  const [fautes, setFautes] = useState(props.fautes ? props.item?.faute : '')
  const [nameReparation, setNameReparation] = useState<string>(props.item ? props.item.faute?.id : '')
  
  const [formValues, setFormValues] = useState({
    demarcheMediation: props.item ? props.item.demarcheMediation : '',
    fauteId: props.item ? props.item.faute?.id : '',
  });
  
  const [matchList, setMatchList] = useState<string[]>([]);

  const handleOptionSelect = (option: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      fauteId: extractIdFromString(option),
    }));
  };

  const handleTypingInput = (keyword: string) => {
    if (keyword.length > 0) {
      const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
      const fautesApi = new FautesApi({
        ...state.environment,
        accessToken: token,
      });

      fautesApi
        .fautesRecords(keyword, 'Bearer ' + token)
        .then((response) => {
          if (response && response.data) {
            if (response.data.success === true) {
              setMatchList(response.data.content);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    }
  };

  const extractIdFromString = (str: string): number | null => {
    const matches = str.match(/:(\d+)$/);
    if (matches && matches[1]) {
      const id = parseInt(matches[1], 10);
      if (!isNaN(id)) {
        return id;
      }
    }
    return null;
  };

  // const handleDemarcheMediationChange = (event: any) => setDemarcheMediation(event.target.value);
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
  };

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
    const reparationApi = new ReparationsApi({
      ...state.environment,
      accessToken: token,
    });

    setIsLoading(true);
   
    reparationApi
      .createReparation(formValues.demarcheMediation, formValues.fauteId, 'Bearer ' + token)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            props.onClose();
            if (props.refresh) props.refresh();

            props.setSuccessNotifMessage(response.data.message);
            props.setSuccessNotifDescription(
              'A new reparation has been successfully created!'
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

  const handleUpdate = (_event: React.FormEvent) => {
    _event.preventDefault();

    const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    const reparationApi = new ReparationsApi({
      ...state.environment,
      accessToken: token,
    });

    setIsLoading(true);

    reparationApi
      .updateReparation(formValues.demarcheMediation, formValues.fauteId, 'Bearer ' + token, props.item?.id)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            props.onClose();
            if (props.refresh) props.refresh();

            props.setSuccessNotifMessage(response.data.message);
            props.setSuccessNotifDescription(
              'This reparation has been successfully updated!'
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
    className="authentication-modal fixed inset-0 z-50 flex items-center justify-center overflow-auto"
    onClick={props.onClose}
  >
    <div
      className="top-modal-animation  relative mx-auto w-full max-w-3xl items-center justify-center px-4 sm:top-0 sm:max-h-96 sm:px-6 md:top-[50vh] lg:px-8"
      onClick={(event) => event.stopPropagation()}
    >
      {/* Contact Form */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        
          <div className="modal-body">
          <button onClick={props.onClose} className="flex">
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
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h2 className="  mb-[1rem] text-size-[1.25rem]  font-medium text-black dark:text-white">
                        {props.title}
                        </h2>
                    </div>
            <form className="modal-form">
              <div className="form-group w-full">
                <label htmlFor="demarcheMediation" className="mb-2.5 block text-black dark:text-white">
                  Demarche de mediation <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  id="demarcheMediation"
                  name="demarcheMediation"
                  value={formValues.demarcheMediation}
                  disabled={props.mode === MODAL_MODE.view}
                  onChange={handleInputChange}
                  placeholder="Enter a reparation mediation"
                  className={`form-input form-class w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black dark:text-white ${
                    props.mode === MODAL_MODE.view ? 'disabled-input' : ''
                  }`}
                />
              </div>
              <div className="form-group w-full">
                {/* <label htmlFor="fauteId" className="form-label form-class mb-2.5 block text-black dark:text-white">Libelle de la Faute</label> */}
                <CustomSelectInput
                    required={true}
                    inputLabel="Faute"
                    inputPlaceholder="Saisir le libelle d'une faute"
                    wrapperStyle="w-full"
                    labelStyle="mb-2.5 block text-black dark:text-white"
                    inputStyle="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    maxHeightList={300}
                    matchList={matchList}
                    selectOptionEvent={handleOptionSelect}
                    typingInputEvent={handleTypingInput}
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

export default CreateOrUpdateReparationModal;
