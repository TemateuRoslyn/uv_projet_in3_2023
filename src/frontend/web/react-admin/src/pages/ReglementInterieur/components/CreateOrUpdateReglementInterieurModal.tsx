import { useEffect, useState } from "react";
import { MODAL_MODE } from "../../../constants/ENUM";
import { EditIcon, NewIcon } from "../../../components/Icone";
import { ReglementInterieur, ReglementCreateBody } from "../../../generated/models";
import { TOKEN_LOCAL_STORAGE_KEY } from "../../../constants/LOCAL_STORAGE";
import { useSelector } from "react-redux";
import { ReduxProps } from "../../../redux/configureStore";
import Indicator from "../../Authentication/components/Indicator";
import { ReglementInterieursApi } from "../../../generated";
import { ReglementUpdateBody } from "../../../api/models";

interface ModalProps {
  mode: MODAL_MODE;
  title: string;
  onClose: () => void;
  refresh?: () => void;
  item?: ReglementInterieur | null;

  setShowSuccessNotif: (value: boolean) => void;
  setSuccessNotifMessage: (value: string) => void;
  setSuccessNotifDescription: (value: string | null) => void;

  setShowWarning: (value: boolean) => void;
  setWarningMessage: (value: string) => void;
  setWarningNotifDescription: (value: string | null) => void;
}

const CreateOrUpdateReglementInterieurModal: React.FC<ModalProps> = (props) => {
  const state = useSelector((state: ReduxProps) => state);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [libelle, setLibelle] = useState<string>(props.item ? props.item.libelle : "");

  const handleLibelleChange = (event: any) => setLibelle(event.target.value);

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

  const handleCreate = (_event: any) => {
    _event.preventDefault();

    const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    const reglementInterieurApi = new ReglementInterieursApi({ ...state.environment, accessToken: token });

    setIsLoading(true);

    const apiParams: ReglementCreateBody = {
      libelle: libelle,
     
    };
    console.log(apiParams);
    reglementInterieurApi
      .createReglementInterieur(apiParams, "Bearer " + token)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            props.onClose();
            if (props.refresh) props.refresh();

            props.setSuccessNotifMessage(response.data.message);
            props.setSuccessNotifDescription(
              "A new reglementInterieure has been successfully created!"
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
    const reglementInterieurApi = new ReglementInterieursApi({ ...state.environment, accessToken: token });

    setIsLoading(true);

    const apiParams: ReglementUpdateBody = {
      
      libelle: libelle,
      
    };

    reglementInterieurApi
      .updateReglementInterieur(apiParams, "Bearer " + token, props.item?.id)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            props.onClose();
            if (props.refresh) props.refresh();

            props.setSuccessNotifMessage(response.data.message);
            props.setSuccessNotifDescription(
              "This reglementInterieur has been successfully updated!"
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
      className="authentication-modal"
      onClick={props.onClose}
    >
     <div className="modal-container relative items-center justify-center mx-auto  top-modal-animation" onClick={(event) => event.stopPropagation()}>
                <div className="modal-content bg-white bg-white rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
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
                        <h2 className="modal-title font-medium text-black dark:text-white">
                        {props.title}
                        </h2>
                    </div>
            <form className="modal-form">
              <div className="form-group">
                <label htmlFor="libelle" className="form-label form-class mb-2.5 block text-black dark:text-white">
                  Libelle
                </label>
                <input
                  type="text"
                  id="libelle"
                  value={libelle}
                  disabled={props.mode === MODAL_MODE.view}
                  onChange={handleLibelleChange}
                  placeholder="Enter a reglementInterieur libelle"
                  className={`form-input form-class w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black dark:text-white ${props.mode === MODAL_MODE.view ? 'disabled-input' : ''}`}
                />
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
                        
                        {props.mode !== MODAL_MODE.view && props.mode === MODAL_MODE.create ? 
                            <button onClick={handleCreate} className="create-button" >
                               {isLoading ? <Indicator height={5} border="white"/> : <NewIcon size={2} color="#fff" />}  
                                <span className="ml-2">Créer </span>
                            </button> : null }
                        {props.mode !== MODAL_MODE.view && props.mode === MODAL_MODE.update ? 
                            <button onClick={handleUpdate} className="create-button">
                                <EditIcon color="#fff" size={18} />
                                Enregistrer
                            </button> : null
                        } 
               
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrUpdateReglementInterieurModal;
