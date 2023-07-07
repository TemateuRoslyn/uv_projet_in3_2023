import { ChangeEvent, useEffect, useState } from 'react';
import { MODAL_MODE } from '../../../constants/ENUM';
import { EditIcon, NewIcon } from '../../../components/Icone';
import {
  ConseilDiscipline,
  ConseilDisciplineCreateBody,
  EleveAndKeywordEleveIdBody,
  EleveEleveIdBody,
  UpdateConseilDisciplineIdBody,
} from '../../../generated/models';
import { TOKEN_LOCAL_STORAGE_KEY } from '../../../constants/LOCAL_STORAGE';
import { ElevesApi, ConseilDisciplinesApi, FautesApi } from '../../../generated';
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
import CustomSelectInpuupdateConvocationt from '../../../components/CustomSelects/CustomSelectInput';
import CustomSelectInput from '../../../components/CustomSelects/CustomSelectInput';

interface ModalProps {
  mode: MODAL_MODE;
  title: string;
  onClose: () => void;
  refresh?: () => void;
  item?: ConseilDiscipline | null;

  setShowSuccessNotif: (value: boolean) => void;
  setSuccessNotifMessage: (value: string) => void;
  setSuccessNotifDescription: (value: string | null) => void;

  setShowWarning: (value: boolean) => void;
  setWarningMessage: (value: string) => void;
  setWarningNotifDescription: (value: string | null) => void;
}

const CreateOrUpdateConseilDisciplineModal: React.FC<ModalProps> = (props) => {
  const state = useSelector((state: ReduxProps) => state);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formValues, setFormValues] = useState({
    heureDebut: props.item ? props.item.heureDebutCd : '',
    dateCd: props.item ? props.item.dateCd : '',
    heureFinCd: props.item ? props.item.heureFinCd : '',
    eleveId: props.item ? props.item.eleveId : '',
    fauteId: props.item ? props.item.fauteId : '',
  });

  console.log(props.item);

  const [matchList, setMatchList] = useState<string[]>([]);

  const [matchListFautes, setMatchListFautes] = useState<string[]>([]);

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
  const filterByLike = (array, searchString) => {
    console.log(array, searchString);
    const filteredArray = array.filter(item => {
      const regex = new RegExp(searchString, 'i');
      return regex.test(item);
    });
    return filteredArray;
  };
  
  const filterByLike2 = (array, prop, searchString) => {
    const filteredArray = array.filter(item => {
      const regex = new RegExp(searchString, 'i');
      return regex.test(item[prop]);
    });
    return filteredArray;
  };

  

  const handleTypingInputFaute = (keyword: string) => {
    if (keyword.length > 0) {
      const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
      const fautesApi = new FautesApi({
        ...state.environment,
        accessToken: token,
      });
      
    
      console.log(formValues.eleveId);
      fautesApi
        .viewFauteEleveAndKeyword( 'Bearer ' + token,formValues.eleveId,keyword)
        .then((response) => {
          if (response && response.data) {
            if (response.data.success === true) {
              const content = response.data.content
              console.log(response.data);
              setMatchListFautes(content);
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

  const handleOptionSelectFaute = (option: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      fauteId: extractIdFromString(option),
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
    const conseilDisciplineApi = new ConseilDisciplinesApi({
      ...state.environment,
      accessToken: token,
    });

    setIsLoading(true);

    conseilDisciplineApi
      .createConseilDiscipline(
        formValues.dateCd,
        formValues.heureDebut,
        formValues.heureFinCd,
        formValues.eleveId,
        formValues.fauteId,
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
              "Une nouvelle conseilDiscipline viens d'etre rajoutee au catalogue avec success ! "
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
    const conseilDisciplineApi = new ConseilDisciplinesApi({
      ...state.environment,
      accessToken: token,
    });

    setIsLoading(true);

    const apiParams : UpdateConseilDisciplineIdBody = {
      eleveId : formValues.eleveId,
      fauteId : formValues.fauteId,
      heureDebutCd : formValues.heureDebut,
      heureFinCd : formValues.heureFinCd,
      dateCd: formValues.dateCd,
    }

    console.log(apiParams,props.item?.id);

    conseilDisciplineApi
      .updateConseilDiscipline(
        apiParams,
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
              "Cet conseilDiscipline viens d'etre modifie(e), vous pouvez le consulter  au catalogue avec success ! "
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
      className="authentication-modal pl-800 pt-20"
      onClick={props.onClose}
    >
      <div
        className="top-modal-animation relative mx-auto items-center  justify-center px-1"
        onClick={(event) => event.stopPropagation()}
      >
        {/* <!-- Contact Form --> */}
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
              <h3 className=" modal-title font-medium text-black dark:text-white">
                {props.title}
              </h3>
            </div>
            <form
              action="#"
              encType="multipart/form-data"
              className="modal-form"
            >
              <div className='w-full'>
                {/* row 1 lastname, firstname, tel*/}
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                    Date ConseilDiscipline<span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="dateCd"
                      value={formValues.dateCd}
                      onChange={handleInputChange}
                      required
                      type="date"
                      placeholder="Enter the date"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <CustomSelectInput
                      required={true}
                      inputLabel="Eleve"
                      inputPlaceholder="Saisir le nom d'une eleve"
                      wrapperStyle="w-full "
                      labelStyle="mb-2.5 block text-black dark:text-white"
                      inputStyle="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      maxHeightList={300}
                      matchList={matchList}
                      selectOptionEvent={handleOptionSelect}
                      typingInputEvent={handleTypingInput}
                    />
                  </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <CustomSelectInput
                      required={true}
                      inputLabel="Fautes"
                      inputPlaceholder="Saisir le nom d'une faute"
                      wrapperStyle="w-full"
                      labelStyle="mb-2.5 block text-black dark:text-white"
                      inputStyle="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      maxHeightList={300}
                      matchList={matchListFautes}
                      selectOptionEvent={handleOptionSelectFaute}
                      typingInputEvent={handleTypingInputFaute}
                    />
                  </div>
               <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  {/* row 2 class, serie, photo*/}
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Heure de debut<span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="heureDebut"
                      value={formValues.heureDebut}
                      onChange={handleInputChange}
                      required
                      type="text"
                      placeholder="Enter ConseilDiscipline time"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Heure de fin<span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="heureFinCd"
                      value={formValues.heureFinCd}
                      onChange={handleInputChange}
                      required
                      type="text"
                      placeholder="Enter ConseilDiscipline time"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="form-actions bg-green-600 w-full">
                            <button onClick={props.onClose} className="cancel-button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="button-icon">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                                Annuler
                            </button>
                            {props.mode !== MODAL_MODE.view && props.mode === MODAL_MODE.create ? 
                                <button onClick={handleCreate} className="create-button" >
                                {isLoading ? <Indicator widtf={5} height={5} border="white"/> : <NewIcon size={2} color="#fff" />}  
                                    <span className="ml-2">Créer </span>
                                </button> : null }
                            {props.mode !== MODAL_MODE.view && props.mode === MODAL_MODE.update ? 
                                <button onClick={handleUpdate} className="create-button">
                                    <EditIcon color="#fff" size={18} />
                                    Enregistrer
                                </button> : null
                            } 
                        </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrUpdateConseilDisciplineModal;
