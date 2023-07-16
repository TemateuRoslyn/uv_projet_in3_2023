import { useEffect, useState } from "react";
import { MODAL_MODE } from "../../../constants/ENUM";
import { EditIcon, NewIcon } from "../../../components/Icone";
import { Suggestion, SuggestionCreateBody, SuggestionUpdateBody } from "../../../generated/models";
import { TOKEN_LOCAL_STORAGE_KEY } from "../../../constants/LOCAL_STORAGE";
import { useSelector } from "react-redux";
import { ReduxProps } from "../../../redux/configureStore";
import Indicator from "../../Authentication/components/Indicator";
import { SuggestionsApi } from "../../../generated";

interface ModalProps {
  mode: MODAL_MODE;
  title: string;
  onClose: () => void;
  refresh?: () => void;
  item?: Suggestion | null;

  setShowSuccessNotif: (value: boolean) => void;
  setSuccessNotifMessage: (value: string) => void;
  setSuccessNotifDescription: (value: string | null) => void;

  setShowWarning: (value: boolean) => void;
  setWarningMessage: (value: string) => void;
  setWarningNotifDescription: (value: string | null) => void;
}

const CreateOrUpdateSuggestionModal: React.FC<ModalProps> = (props) => {
  const state = useSelector((state: ReduxProps) => state);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [description, setDescription] = useState<string>(props.item ? props.item.description : "");

  const handleDescriptionChange = (event: any) => setDescription(event.target.value);

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
    const suggestionApi = new SuggestionsApi({ ...state.environment, accessToken: token });

    setIsLoading(true);

    const apiParams: SuggestionCreateBody = {
      description: description,
     
    };
    console.log(apiParams);
    suggestionApi
      .createSuggestion(apiParams, "Bearer " + token)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            props.onClose();
            if (props.refresh) props.refresh();

            props.setSuccessNotifMessage(response.data.message);
            props.setSuccessNotifDescription(
              "A new suggestione has been successfully created!"
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
    const suggestionApi = new SuggestionsApi({ ...state.environment, accessToken: token });

    setIsLoading(true);

    const apiParams: SuggestionUpadteBody = {
      id: props.item?.id,
      description: description,
      
    };

    suggestionApi
      .updateSuggestion(apiParams, "Bearer " + token, props.item?.id)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            props.onClose();
            if (props.refresh) props.refresh();

            props.setSuccessNotifMessage(response.data.message);
            props.setSuccessNotifDescription(
              "This suggestion has been successfully updated!"
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
                        <h2 className="  mb-[1rem] text-size-[1.25rem] font-medium text-black dark:text-white">
                        {props.title}
                        </h2>
                    </div>
            <form className="modal-form">
              <div className="form-group">
                <label htmlFor="description" className="form-label form-class mb-2.5 block text-black dark:text-white">
                  description
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  disabled={props.mode === MODAL_MODE.view}
                  onChange={handleDescriptionChange}
                  placeholder="Enter a suggestion description"
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

export default CreateOrUpdateSuggestionModal;
