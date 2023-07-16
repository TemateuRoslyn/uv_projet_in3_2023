import { ChangeEvent, useEffect, useState } from 'react';
import { MODAL_MODE } from '../../../constants/ENUM';
import { EditIcon, NewIcon } from '../../../components/Icone';
import { Convocation, ConvocationCreateBody } from '../../../generated/models';
import { TOKEN_LOCAL_STORAGE_KEY } from '../../../constants/LOCAL_STORAGE';
import { ElevesApi, ConvocationApi } from '../../../generated';
import { useSelector } from 'react-redux';
import { ReduxProps } from '../../../redux/configureStore';
import Indicator from '../../Authentication/components/Indicator';
import {
  CLASSE_LEVEL,
  SEXE,
  SOLVABLE,
  STATUS,
  getEleveByName,
} from '../../../constants/ITEMS';
import CustomSelectInput from '../../../components/CustomSelects/CustomSelectInput';

interface ModalProps {
  mode: MODAL_MODE;
  title: string;
  onClose: () => void;
  refresh?: () => void;
  item?: Convocation | null;

  setShowSuccessNotif: (value: boolean) => void;
  setSuccessNotifMessage: (value: string) => void;
  setSuccessNotifDescription: (value: string | null) => void;

  setShowWarning: (value: boolean) => void;
  setWarningMessage: (value: string) => void;
  setWarningNotifDescription: (value: string | null) => void;
}

const CreateOrUpdateConvocationModal: React.FC<ModalProps> = (props) => {
  const state = useSelector((state: ReduxProps) => state);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formValues, setFormValues] = useState({
    libelle: props.item ? props.item.libelle : '',
    dateConvocation: props.item ? props.item.dateConvocation : '',
    dateRdv: props.item ? props.item.dateRdv : '',
    status: props.item ? props.item.statut : '',
    eleveId: props.item ? props.item.eleve?.id : '',
  });

  const [matchList, setMatchList] = useState<string[]>([]);

  const handleTypingInput = (keyword: string) => {
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
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    }
  };

  const handleOptionSelect = (option: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      eleveId: extractIdFromString(option),
    }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = e.target.files ? e.target.files[0] : null;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: file,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
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

  const handleCreate = (_event: React.FormEvent) => {
    _event.preventDefault(); // stopper la soumissoin par defaut du formulaire...

    const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    const convocationApi = new ConvocationApi({
      ...state.environment,
      accessToken: token,
    });

    setIsLoading(true);
    const apiParams : ConvocationCreateBody={
      libelle: formValues.libelle,
      dateConvocation:  formValues.dateConvocation,
      dateRdv: formValues.dateRdv,
      statut: undefined,
      personnelId: undefined,
      eleveId: undefined
    }

    convocationApi
      .createConvocation(
        
       
        
        formValues.status,
        formValues.eleveId,
        'Bearer ' + token
      )
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            props.onClose();
            if (props.refresh) props.refresh();

            // notification
            props.setSuccessNotifMessage(response.data.message);
            props.setSuccessNotifDescription(
              "Une nouvelle convocation viens d'etre rajoutee au catalogue avec success ! "
            );
            props.setShowSuccessNotif(true);
          }
        }
      })
      .catch((error) => {
        alert(error.message);
        console.log(error?.response?.data);
      })
      .finally(() => {
        setIsLoading(false);

        // notification
        setTimeout(() => {
          props.setShowSuccessNotif(false);
        }, 3000);
      });
  };

  const handleUpdate = (_event: any) => {
    _event.preventDefault(); // stopper la soumissoin par defaut du formulaire...

    const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    const convocationApi = new ConvocationApi({
      ...state.environment,
      accessToken: token,
    });

    setIsLoading(true);

    console.log(formValues);

    convocationApi
      .updateConvocation(
        formValues.libelle,
        formValues.dateConvocation,
        formValues.dateRdv,
        formValues.status,
        formValues.eleveId,
        'Bearer ' + token,
        props.item?.id
      )
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            props.onClose();
            if (props.refresh) props.refresh();

            // notification
            props.setSuccessNotifMessage(response.data.message);
            props.setSuccessNotifDescription(
              "Cet convocation viens d'etre modifie(e), vous pouvez le consulter  au catalogue avec success ! "
            );
            props.setShowSuccessNotif(true);
          }
        }
      })
      .catch((error) => {
        console.log(error?.response?.data);
      })
      .finally(() => {
        setIsLoading(false);

        // notification
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
              <h3 className="   mb-[1rem] text-size-[1.25rem] font-medium text-black dark:text-white">
                {props.title}
              </h3>
            </div>
            <form
              action="#"
              encType="multipart/form-data"
              className="modal-form"
            >
              <div>
                {/* row 1 lastname, firstname, tel*/}
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/3">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Libelle<span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="libelle"
                      value={formValues.libelle}
                      onChange={handleInputChange}
                      required
                      type="text"
                      placeholder="Enter the libelle"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/3">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Date Convocation <span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="dateConvocation"
                      value={formValues.dateConvocation}
                      onChange={handleInputChange}
                      required
                      type="date"
                      placeholder="Enter Date Convocation"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/3">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Date RDV <span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="dateRdv"
                      value={formValues.dateRdv}
                      onChange={handleInputChange}
                      required
                      type="date"
                      placeholder="Enter Date Convocation"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  {/* row 2 class, serie, photo*/}
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <CustomSelectInput
                      required={true}
                      inputLabel="Eleve"
                      inputPlaceholder="Saisir le nom d'une eleve"
                      wrapperStyle="w-full"
                      labelStyle="mb-2.5 block text-black dark:text-white"
                      inputStyle="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      maxHeightList={300}
                      matchList={matchList}
                      selectOptionEvent={handleOptionSelect}
                      typingInputEvent={handleTypingInput}
                    />
                  </div>

                  <div className="w-full xl:w-1/3">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Status<span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="status"
                      value={formValues.status}
                      onChange={handleInputChange}
                      required
                      type="text"
                      placeholder="Enter Convocation status"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
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
                      <Indicator height={5} border="white" widtf={5} />
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

export default CreateOrUpdateConvocationModal;
