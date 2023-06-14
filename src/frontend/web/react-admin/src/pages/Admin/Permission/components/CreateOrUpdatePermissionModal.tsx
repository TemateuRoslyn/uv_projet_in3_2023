import { useEffect, useState } from "react";
import { MODAL_MODE } from "../../../../constants/ENUM";
import { EditIcon, NewIcon } from "../../../../components/Icone";
import { Permission, PermissionsCreateBody, UpdatePermissionIdBody } from "../../../../generated/models";
import { TOKEN_LOCAL_STORAGE_KEY } from "../../../../constants/LOCAL_STORAGE";
import { PermissionsApi } from "../../../../generated";
import { useSelector } from "react-redux";
import { ReduxProps } from "../../../../redux/configureStore";
import Indicator from "../../../Authentication/components/Indicator";

interface ModalProps {
    mode: MODAL_MODE,
    title: string,
    onClose: () => void,
    refresh?: () => void,
    item?: Permission | null,

    setShowSuccessNotif: (value: boolean) => void,
    setSuccessNotifMessage: (value: string) => void,
    setSuccessNotifDescription: (value: string | null) => void,
    
    setShowWarning: (value: boolean) => void,
    setWarningMessage: (value: string) => void,
    setWarningNotifDescription: (value: string | null) => void,
}

const CreateOrUpdatePermissionModal: React.FC<ModalProps> = (props) => {

    const state = useSelector((state: ReduxProps) => state);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [name, setName] = useState<string>(props.item ? props.item.name : '');
    const [description, setDescription] = useState<string>(props.item ? props.item.description : '');

    const handleNameChange = (event: any) => setName(event.target.value);
    const handleDescriptionChange = (event: any) => setDescription(event.target.value);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") { props.onClose(); }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => { document.removeEventListener("keydown", handleKeyDown); };
    }, [props]);

    const handleCreate = (_event: any) => {
        _event.preventDefault() // stopper la soumissoin par defaut du formulaire...

        const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
        const permissionsApi = new PermissionsApi({...state.environment, accessToken: token});

        setIsLoading(true)

        const apiParams: PermissionsCreateBody = {
            name: name,
            description: description
          }

        permissionsApi.permissionCreate(apiParams, 'Bearer ' + token)
        .then((response) => {  
        if(response && response.data){                    
            if(response.data.success === true){ 
                props.onClose()
                if(props.refresh) props.refresh()

                // notification
                props.setSuccessNotifMessage(response.data.message)
                props.setSuccessNotifDescription('Une nouvelle permission viens d\'etre rajoutee au catalogue avec success ! ')
                props.setShowSuccessNotif(true)
            }
        }
        })
        .catch((error) => {
            alert(error?.response?.data?.message)
        })
        .finally(() => {
            setIsLoading(false)

            // notification
            setTimeout(() => {
                props.setShowSuccessNotif(false)
              }, 3000);
        });          
    }

    const handleUpdate = (_event: any) => {
        _event.preventDefault() // stopper la soumissoin par defaut du formulaire...

        const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
        const permissionsApi = new PermissionsApi({...state.environment, accessToken: token});

        setIsLoading(true)

        const apiParams: UpdatePermissionIdBody = {
            name: name,
            description: description
          }

        permissionsApi.permissionUpdate(apiParams, 'Bearer ' + token, props.item?.id)
        .then((response) => {  
        if(response && response.data){                    
            if(response.data.success === true){ 
                props.onClose()
                if(props.refresh) props.refresh()

                // notification
                props.setSuccessNotifMessage(response.data.message)
                props.setSuccessNotifDescription('Cette permission a ete correctement mise a jour, veuillez consulter le catalogue !')
                props.setShowSuccessNotif(true)
            }
        }
        })
        .catch((error) => {
            alert(error?.response?.data?.message)
        })
        .finally(() => {
            setIsLoading(false)

            // notification
            setTimeout(() => {
                props.setShowSuccessNotif(false)
              }, 3000);
        });  

    }


    return (
        <div
            id="authentication-modal"
            className="authentication-modal"
            onClick={props.onClose}
        >
             <div className="modal-container relative items-center justify-center mx-auto  px-1  top-modal-animation" onClick={(event) => event.stopPropagation()}>
                <div className="modal-content bg-white bg-white rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                <button onClick={props.onClose} className="close-button">
                    <svg aria-hidden="true" className="close-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
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
                        <label htmlFor="name" className="form-label form-class mb-2.5 block text-black dark:text-white">Name</label>
                        <input
                        type="text"
                        id="name"
                        value={name}
                        disabled={props.mode === MODAL_MODE.view ? true : false}
                        onChange={handleNameChange}
                        placeholder="Enter a permission name"
                        className={`form-input form-class w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black dark:text-white ${props.mode === MODAL_MODE.view ? 'disabled-input' : ''}`}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="form-label form-class mb-2.5 block text-black dark:text-white">Description</label>
                        <textarea
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Enter a permission description"
                        rows={4}
                        className={`form-input form-class w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black dark:text-white ${props.mode === MODAL_MODE.view ? 'disabled-input' : ''}`}
                        />
                    </div>
                    <div className="form-actions bg-green-600">
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
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}

export default CreateOrUpdatePermissionModal;