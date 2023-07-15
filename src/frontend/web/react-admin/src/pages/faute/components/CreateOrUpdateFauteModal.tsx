import { SetStateAction, useEffect, useState } from 'react';
import { MODAL_MODE } from '../../../constants/ENUM';
import { EditIcon, NewIcon } from '../../../components/Icone';
import {
  Faute,
  FautesCreateBody,
  UpdateFauteIdBody,
} from '../../../generated/models';
import { TOKEN_LOCAL_STORAGE_KEY } from '../../../constants/LOCAL_STORAGE';
import { ElevesApi, ReglesApi, FautesApi} from '../../../generated';
import { useSelector } from 'react-redux';
import { ReduxProps } from '../../../redux/configureStore';
import Indicator from '../../Authentication/components/Indicator';
import CustomSelectInput from '../../../components/CustomSelects/CustomSelectInput';


interface ModalProps {
  mode: MODAL_MODE;
  title: string;
  onClose: () => void;
  refresh?: () => void;
  item?: Faute | null;

  setShowSuccessNotif: (value: boolean) => void;
  setSuccessNotifMessage: (value: string) => void;
  setSuccessNotifDescription: (value: string | null) => void;

  setShowWarning: (value: boolean) => void;
  setWarningMessage: (value: string) => void;
  setWarningNotifDescription: (value: string | null) => void;
}

const CreateOrUpdateFauteModal: React.FC<ModalProps> = (props) => {
  const state = useSelector((state: ReduxProps) => state);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [matchList, setMatchList] = useState<string[]>([]);

  const [libelle, setLibelle] = useState<string>(
    props.item ? props.item.libelle : ''
  );
  const [gravite, setGravite] = useState<number>(
    props.item ? props.item.gravite : ''
  );
  const [eleveId,setElevesId ] = useState<number>(
    props.item ? props.item.eleveId : ''
  );
  const [regleId, setReglesId] = useState<number>(
    props.item ? props.item.regleId : ''
  );
  
  const handleLibelleChange = (event: any) => setLibelle(event.target.value);
  const handleGraviteChange = (event: any) => setGravite(event.target.value);
  

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

  const handleTypingInputEleve = (keyword: string) => {
    if (keyword.length > 0) {
      const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
      const elevesApi = new ElevesApi({
        ...state.environment,
        accessToken: token,
      });

      elevesApi
      .elevesRecords(keyword, 'Bearer ' + token)
        .then((response) => {
          if (response && response.data) {
            if (response.data.success === true) {
              setMatchList(response.data.content);
            }
          }
        })
        .catch((error: any) => {
          console.log(error);
        })
        .finally(() => {});
    }
  };
 
  
   const handleTypingInputRegle = (keyword: string) => {
     if (keyword.length > 0) {
       const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
       const reglesApi = new ReglesApi({
         ...state.environment,
         accessToken: token,
       });

      reglesApi
        .reglesRecords(keyword, 'Bearer ' + token)
        .then((response) => {
          if (response && response.data) {
            if (response.data.success === true) {
              setMatchList(response.data.content);
            }
          }
        })
        .catch((error: any) => {
          console.log(error);
        })
        .finally(() => {});
     }
    }
    
  
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

   const handleOptionSelectEleve = (option: string) => {
     setElevesId(extractIdFromString(option));
   };
  const handleOptionSelectRegle = (option: string) => {
    setReglesId(extractIdFromString(option));
  };
  
  const handleCreate = (_event: any) => {
    _event.preventDefault();

    const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    const fautesApi = new FautesApi({ ...state.environment, accessToken: token });

    setIsLoading(true);

    const apiParams: FautesCreateBody = {
      libelle: libelle,
      gravite: gravite,
      eleveId:eleveId,
      regleId:regleId,
    };
    console.log(apiParams);
    fautesApi
    .createMistake(apiParams, 'Bearer ' + token)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            props.onClose();
            if (props.refresh) props.refresh();

            props.setSuccessNotifMessage(response.data.message);
            props.setSuccessNotifDescription(
              'A new mistake has been successfully created!'
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
    const fautesApi = new FautesApi({ ...state.environment, accessToken: token });

    setIsLoading(true);

    const apiParams: UpdateFauteIdBody = {
      libelle: libelle,
      gravite: gravite,
      eleveId: eleveId,
      regleId: regleId,
    };
    console.log(apiParams);

    fautesApi
      .updateMistake(apiParams, 'Bearer ' + token, props.item?.id)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            props.onClose();
            if (props.refresh) props.refresh();

            props.setSuccessNotifMessage(response.data.message);
            props.setSuccessNotifDescription(
              'This mistake has been successfully updated!'
            );
            props.setShowSuccessNotif(true);
          }
        }
      })
      .catch((error: { response: { data: { message: any; }; }; }) => {
        alert(error?.response?.data?.message);
        console.log(error);
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
    className="authentication-modal fixed inset-0 z-50  w-300 flex items-center justify-center overflow-auto"
    onClick={props.onClose}
  >
    <div
      className="top-modal-animation  relative mx-auto w-300 max-w-3xl items-center justify-center px-4 sm:top-0 sm:max-h-96 sm:px-6 md:top-[50vh] lg:px-8"
      onClick={(event) => event.stopPropagation()}
    >
      {/* Contact Form */}
      <div className="rounded-sm border w-300 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      
          <div className="modal-body w-300">
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
            <div className="border-b w-300 border-stroke py-4 px-6.5 dark:border-strokedark">
              <h2 className="   mb-[1rem] text-size-[1.25rem] font-medium text-black dark:text-white">
                {props.title}
              </h2>
            </div>
            <form className="modal-form w-300">
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
                  placeholder="Enter a fautes libelle"
                  className={`form-input form-class w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:
                  cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black ${
                    props.mode === MODAL_MODE.view ? 'disabled-input' : ''
                  }`}
                />
                <div className="form-group">
                <label
                  htmlFor="gravite"
                  className="form-label form-class mb-2.5 block text-black dark:text-white"
                >
                  Gravite
                </label>
                <input
                  type="text"
                  id="gravite"
                  value={gravite}
                  disabled={props.mode === MODAL_MODE.view}
                  onChange={handleGraviteChange}
                  placeholder="Enter a fautes "
                  className={`form-input form-class w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black ${
                    props.mode === MODAL_MODE.view ? 'disabled-input' : ''
                  }`}
                />
              <CustomSelectInput
                    required={true}
                    inputLabel=" eleve"
                    inputPlaceholder="Saisir le nom d'un eleve"
                    wrapperStyle="w-full"
                    labelStyle="mb-2.5 block text-black dark:text-white"
                    inputStyle="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    maxHeightList={100}
                    matchList={matchList}
                    selectOptionEvent={handleOptionSelectEleve}
                    typingInputEvent={handleTypingInputEleve}
                  />
                  <CustomSelectInput
                    required={true}
                    inputLabel=" regle"
                    inputPlaceholder="Saisir la regle"
                    wrapperStyle="w-full"
                    labelStyle="mb-2.5 block text-black dark:text-white"
                    inputStyle="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    maxHeightList={100}
                    matchList={matchList}
                    selectOptionEvent={handleOptionSelectRegle}
                    typingInputEvent={handleTypingInputRegle}
                  />
              </div>
              </div>
            </form>
            </div>
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
  
  );

}
export default CreateOrUpdateFauteModal;
