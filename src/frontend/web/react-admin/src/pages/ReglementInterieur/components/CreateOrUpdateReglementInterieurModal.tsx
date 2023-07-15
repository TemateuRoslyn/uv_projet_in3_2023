import { useEffect, useState } from "react";
import { MODAL_MODE } from '../../../constants/ENUM';
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
    console.log(apiParams);

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
              <div className="form-actions bg-green-600">
                  <button
                    onClick={props.onClose}
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
                    Annuler
                  </button>

                  {props.mode !== MODAL_MODE.view &&
                  props.mode === MODAL_MODE.create ? (
                    <button
                      onClick={handleCreate}
                      disabled={isLoading}
                      className="ml-2 flex w-1/4 justify-center rounded bg-success p-3 font-medium text-white"
                    >
                      <span className="mt-1 mr-2">
                        {isLoading ? (
                          <Indicator widtf={5} height={5} border="white" />
                        ) : (
                          <NewIcon size={2} color="#fff" />
                        )}
                      </span>
                      Créer
                    </button>
                  ) : null}
                  {props.mode !== MODAL_MODE.view &&
                  props.mode === MODAL_MODE.update ? (
                    <button
                      onClick={handleUpdate}
                      disabled={isLoading}
                      className="ml-2 flex w-1/4 justify-center rounded bg-success p-3 font-medium text-white"
                    >
                      <span className="mt-1 mr-2">
                        {isLoading ? (
                          <Indicator widtf={5} height={5} border="white" />
                        ) : (
                          <EditIcon color="#fff" size={18} />
                        )}
                      </span>
                      Enregistrer
                    </button>
                  ) : null}
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrUpdateReglementInterieurModal;
