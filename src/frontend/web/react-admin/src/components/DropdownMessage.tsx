import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { TOKEN_LOCAL_STORAGE_KEY } from '../constants/LOCAL_STORAGE';
import { ReparationsApi } from '../generated';
import { Reparation } from '../generated/models';
import { ReduxProps } from '../redux/configureStore';
import { useSelector } from 'react-redux';
import { MODAL_MODE } from '../constants/ENUM';

import "./css/DisplaySuggestion.css"

import environment from '../environments/environment.dev';
import Indicator from '../pages/Authentication/components/Indicator';
import { NewIcon } from './Icone';

const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  //Add
  const token : string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
  const state = useSelector((state: ReduxProps) => state);
  const [reparation, setReparation] = useState<Reparation[]>([]);
  
  const [showCreateOrUpdateModal, setShowCreateOrUpdateModal] = useState(false);
  const [reparationItem, setReparationItem] = useState<Reparation>();

  const [modalMode, setModalMode] = useState<MODAL_MODE>(MODAL_MODE.create);
  const [modalTitle, setModalTitle] = useState<string>('');

  useEffect(()=>{
    const reparationsApi = new ReparationsApi({
      ...state.environment,
      accessToken: token,
    });

    reparationsApi.reparationsNotValidated('Bearer '+ token)
    .then((response) => {
      if (response && response.data) {
        if (response.data.success === true) {
          setReparation(response.data.content);
          console.log(response.data);
        }
      }
    })
    .catch((error) => {
      alert(error?.response?.data?.message);
    })
    .finally(() => {
      //setIsLoading(false);
    });
  },[]);

  const refresh = ()=>{
    const reparationApi = new ReparationsApi({
      ...state.environment,
      accessToken: token,
    });

    reparationApi.reparationsNotValidated('Bearer '+ token)
    .then((response) => {
      if (response && response.data) {
        if (response.data.success === true) {
          setReparation(response.data.content);
          console.log(response.data);
        }
      }
    })
    .catch((error) => {
      alert(error?.response?.data?.message);
    })
    .finally(() => {
      //setIsLoading(false);
    });
  }

  const handleItemSelected = (item: Reparation) => {
    setReparationItem(item);
    setShowCreateOrUpdateModal(true);
    setModalMode(MODAL_MODE.view);
    setModalTitle("Détail de la reparation");
    {/*const reparationApi = new ReparationsApi({
      ...state.environment,
      accessToken: token,
    });

    reparationApi.validateReparation("Rejete",'Bearer '+ token,item.id)
    .then((response) => {
      if (response && response.data) {
        if (response.data.success === true) {
          refresh()
          console.log(response.data);
        }
      }
    })
    .catch((error) => {
      alert(error?.response?.data?.message);
    })
    .finally(() => {
      //setIsLoading(false);
    });*/}
  }

  function formatDate(date) {
    const dateOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    };
    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    };
    const datePart = date.toLocaleDateString(undefined, dateOptions);
    const timePart = date.toLocaleTimeString(undefined, timeOptions);
    return `${datePart} ${timePart}`;
  }

//End Add
  
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className='justify-content-center items-center justify-center w-full'>
      <li className="relative" x-data="{ dropdownOpen: false, notifying: true }">
        <Link
          ref={trigger}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-8.5 relative flex h-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
          to="#"
        >
         {reparation.length > 0 ? (
            <span className="text-bold text-xl absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 text-danger">
              {reparation.length}
              <span className="absolute text-bold z-1 inline-flex h-2 w-2 animate-ping rounded-full bg-meta-1 opacity-75">
                {reparation.length}
              </span>
            </span>
          ) : (
            <span className="text-bold absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 text-danger">
              {reparation.length}
            </span>
          )}

          <svg
            className="fill-current duration-300 ease-in-out"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.9688 1.57495H7.03135C3.43135 1.57495 0.506348 4.41558 0.506348 7.90308C0.506348 11.3906 2.75635 13.8375 8.26885 16.3125C8.40947 16.3687 8.52197 16.3968 8.6626 16.3968C8.85947 16.3968 9.02822 16.3406 9.19697 16.2281C9.47822 16.0593 9.64697 15.75 9.64697 15.4125V14.2031H10.9688C14.5688 14.2031 17.522 11.3625 17.522 7.87495C17.522 4.38745 14.5688 1.57495 10.9688 1.57495ZM10.9688 12.9937H9.3376C8.80322 12.9937 8.35322 13.4437 8.35322 13.9781V15.0187C3.6001 12.825 1.74385 10.8 1.74385 7.9312C1.74385 5.14683 4.10635 2.8687 7.03135 2.8687H10.9688C13.8657 2.8687 16.2563 5.14683 16.2563 7.9312C16.2563 10.7156 13.8657 12.9937 10.9688 12.9937Z"
              fill=""
            />
            <path
              d="M5.42812 7.28442C5.0625 7.28442 4.78125 7.56567 4.78125 7.9313C4.78125 8.29692 5.0625 8.57817 5.42812 8.57817C5.79375 8.57817 6.075 8.29692 6.075 7.9313C6.075 7.56567 5.79375 7.28442 5.42812 7.28442Z"
              fill=""
            />
            <path
              d="M9.00015 7.28442C8.63452 7.28442 8.35327 7.56567 8.35327 7.9313C8.35327 8.29692 8.63452 8.57817 9.00015 8.57817C9.33765 8.57817 9.64702 8.29692 9.64702 7.9313C9.64702 7.56567 9.33765 7.28442 9.00015 7.28442Z"
              fill=""
            />
            <path
              d="M12.5719 7.28442C12.2063 7.28442 11.925 7.56567 11.925 7.9313C11.925 8.29692 12.2063 8.57817 12.5719 8.57817C12.9375 8.57817 13.2188 8.29692 13.2188 7.9313C13.2188 7.56567 12.9094 7.28442 12.5719 7.28442Z"
              fill=""
            />
          </svg>
        </Link>

        {/* <!-- Dropdown Start --> */}
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
          className={`absolute -right-16 mt-2.5 flex h-90 w-100 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-100 ${
            dropdownOpen === true ? 'block' : 'hidden'
          }`}
        >
          <div className="px-4.5 py-3">
            <h5 className="text-sm font-medium text-bodydark2">Ensemble des demandes de mediation</h5>
          </div>

          <ul className="flex h-auto flex-col overflow-y-auto">
            {reparation.length>0 ? reparation.map((item, key)=>(
              <li key={key}>
                {/*add onClick on the tag Link*/}
                <Link className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 justify-center items-center"
                onClick={()=>handleItemSelected(item)}>
                  <div className="h-15 w-15 rounded-full">
                    <img className="rounded-full" src={`${environment.basePath}/api/files/download?filekey=${item.faute?.eleve?.photo}`} alt="User" />
                  </div>
                  <div>
                    <h6 className="text-sm font-medium text-black dark:text-white">
                      {item.faute?.eleve?.firstName} {item.faute?.eleve?.lastName}
                    </h6>
                    <p className="text-sm">Reparation: {item.demarcheMediation}<br/>Faute: {item.faute?.libelle}</p>
                    <p className="text-xs">{
                      formatDate(new Date(item.created_at))
                    }</p>
                  </div>
                </Link>
              </li>
              )) : <p className="text-sm text-center items-center justify-center mt-5">
              <span className="text-black dark:text-white">
                  Aucune nouvelle notification.
                </span>
              </p>
            }
          </ul>
        </div>
        {/* <!-- Dropdown End --> */}
      </li>
      {showCreateOrUpdateModal && (
        <ShowReparationModal
          mode={modalMode}
          title={modalTitle}
          onClose={() => setShowCreateOrUpdateModal(false)}
          refresh={refresh}
          item={modalMode !== MODAL_MODE.create ? reparationItem : null}
                 />
      )}
   
    </div>
  );
};

interface ModalProps {
  refresh?: () => void;
  mode: MODAL_MODE;
  title: string;
  onClose: () => void;
  item?: Reparation | null;  
}

const ShowReparationModal: React.FC<ModalProps> = (props) => {
  const state = useSelector((state: ReduxProps) => state);
  // const token : string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
  const [demarcheMediation, setDemarcheMediation] = useState<string>(props.item ? props.item.demarcheMediation : "");
  const [faute, setFaute] = useState<string>(props.item ? props.item.faute?.libelle : "");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleValidate = (_event: any) => {
    _event.preventDefault();

    const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    const reparationApi = new ReparationsApi({
      ...state.environment,
      accessToken: token,
    });

    setIsLoading(true);
   
    reparationApi
      .validateReparation("Valide", 'Bearer ' + token, props.item?.id)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            props.onClose();
            if (props.refresh) props.refresh();
          }
        }
      })
      .catch((error) => {
        alert(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleReject = (_event: any) => {
    _event.preventDefault();

    const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    const reparationApi = new ReparationsApi({
      ...state.environment,
      accessToken: token,
    });

    setIsLoading(true);
   
    reparationApi
      .validateReparation("Rejete", 'Bearer ' + token, props.item?.id)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            props.onClose();
            if (props.refresh) props.refresh();
            setIsLoading(true);
          }
        }
      })
      .catch((error) => {
        alert(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        props.onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [props]);
  
  return (
    <div
      id="authentication-modal"
      className="authentication-modal w-230"
      style={{ position:'relative', }}
      onClick={props.onClose}
    >
     <div className="modal-container relative  w-230 items-center justify-center mx-auto  top-modal-animation" onClick={(event) => event.stopPropagation()}>
                <div className="modal-content w-150 bg-white bg-white rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
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
                        <h2 className=" mb-[1rem] text-size-[1.25rem] font-medium text-black dark:text-white">
                        {props.title}
                        </h2>
                    </div>
            <form className="modal-form">
              <div className="form-group">
                <label htmlFor="demarcheMediation" className="form-label form-class mb-2.5 block text-black dark:text-white">
                  
                </label>
                <p
                  id="demarcheMediation"
                  className={` w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black dark:text-white ${props.mode === MODAL_MODE.view ? 'disabled-input' : ''}`}
                >
                  Voici la demarche de mediation : {demarcheMediation}<br/>
                  Pour la faute : {faute}
                </p>
                {/* row of reject or validate button */}
                <div className="form-actions bg-green-600">
                  <button
                    onClick={handleReject}
                    className="ml-2 flex w-1/4 justify-center rounded bg-secondary p-3 font-medium text-white"
                  >
                    <span className="mt-1">
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
                    </span>
                    Rejeter
                  </button>
                  <button
                    onClick={handleValidate}
                    className="ml-2 flex w-1/4 justify-center rounded bg-success p-3 font-medium text-white"
                  >
                    <span className="mt-1 mr-2">
                      {isLoading ? (
                        <Indicator widtf={5} height={5} border="white" />
                      ) : (
                      <NewIcon size={2} color="#fff" />
                      )}
                    </span>
                    Valider
                  </button>
                </div>
              </div>
              
            </form>
            {props.mode === MODAL_MODE.view ? null : (
              <div className="form-actions bg-green-600">
                <button onClick={props.onClose} className="cancel-button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="button-icon">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                            Annuler
                        </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownMessage;
