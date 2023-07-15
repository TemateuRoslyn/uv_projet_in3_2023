import { useEffect, useState } from "react";
import { MODAL_MODE } from "../../../constants/ENUM";
import { EditIcon, NewIcon } from "../../../components/Icone";
import { Classe, ClassesCreateBody, UpdateClasseIdBody } from "../../../generated/models";
import { TOKEN_LOCAL_STORAGE_KEY } from "../../../constants/LOCAL_STORAGE";
import { ClassesApi } from "../../../generated";
import { useSelector } from "react-redux";
import { ReduxProps } from "../../../redux/configureStore";
import Indicator from "../../Authentication/components/Indicator";
import { CLASSE_ALL_SPECIALITIES, CLASSE_LEVEL, CLASSE_SPECIALITIES, getClasseByName } from "../../../constants/ITEMS";

interface ModalProps {
    mode: MODAL_MODE,
    title: string,
    onClose: () => void,
    refresh?: () => void,
    item?: Classe | null,

    setShowSuccessNotif: (value: boolean) => void,
    setSuccessNotifMessage: (value: string) => void,
    setSuccessNotifDescription: (value: string | null) => void,
    
    setShowWarning: (value: boolean) => void,
    setWarningMessage: (value: string) => void,
    setWarningNotifDescription: (value: string | null) => void,
}

const CreateOrUpdateClasseModal: React.FC<ModalProps> = (props) => {

    const state = useSelector((state: ReduxProps) => state);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [showSpeciality, setShowSpeciality] = useState<boolean>(false);
    const [showAllSpecialities, setShowAllSpecialities] = useState<boolean>(false);
    const [allSpecialities, setAllSpecialites] = useState<{name: string}[]>(CLASSE_ALL_SPECIALITIES);
    
    const [name, setName] = useState<string>(props.item ? props.item.name : CLASSE_LEVEL[0].name);
    const [shortName, setShortName] = useState<string>(props.item ? props.item.shortName : CLASSE_LEVEL[0].shorName);
    const [speciality, setSpeciality] = useState<string | null>(props.item?.speciality ? props.item.speciality : null);

    const handleClasseSelectionChange = (event: any) => {
        const className: string = event.target.value
        const classObj = getClasseByName(className)
        if(classObj?.shorName)
            setShortName(classObj?.shorName);        
        if(classObj?.speciality === true){
            setShowSpeciality(true)   
            if(classObj.allSpeciality === true){
                setShowAllSpecialities(true) 
                setAllSpecialites(CLASSE_ALL_SPECIALITIES)
            } else {
                setSpeciality(null)
                setShowAllSpecialities(false) 
                setAllSpecialites(CLASSE_SPECIALITIES)
            }
        }else {
            setShowSpeciality(false) 
            setSpeciality(null)
        }
        setName(className);
    };

    const handleSpecialitySelectionChange = (event: any) => setSpeciality(event.target.value)


    useEffect(() => {        
        if(props.item?.speciality !== null && props.item?.speciality !== undefined){
            setShowSpeciality(true)
        }else {
            setShowSpeciality(false)
            setSpeciality(null)
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") { props.onClose(); }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => { document.removeEventListener("keydown", handleKeyDown); };
    }, [props]);

    const handleCreate = (_event: any) => {
        _event.preventDefault() // stopper la soumissoin par defaut du formulaire...

        const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
        const classesApi = new ClassesApi({...state.environment, accessToken: token});

        setIsLoading(true)

        const classObj = getClasseByName(name)        

        const apiParams: ClassesCreateBody = {
            name: name,
            shortName: shortName,
            speciality: classObj?.speciality === false ?  null : speciality,
        }          

        classesApi.classeCreate(apiParams, 'Bearer ' + token)
        .then((response) => {  
        if(response && response.data){                    
            if(response.data.success === true){ 
                props.onClose()
                if(props.refresh) props.refresh()

                // notification
                props.setSuccessNotifMessage(response.data.message)
                props.setSuccessNotifDescription('Une nouvelle classe viens d\'etre rajoutee au catalogue avec success ! ')
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
        const classesApi = new ClassesApi({...state.environment, accessToken: token});

        setIsLoading(true)

        const classObj = getClasseByName(name)        

        const apiParams: UpdateClasseIdBody = {
                name: name,
                shortName: shortName,
                speciality: classObj?.speciality === false ?  null : speciality,
                effectif: props.item?.effectif,
        }         

        classesApi.classeUpdate(apiParams, 'Bearer ' + token, props.item?.id)
        .then((response) => {  
        if(response && response.data){                    
            if(response.data.success === true){ 
                props.onClose()
                if(props.refresh) props.refresh()

                // notification
                props.setSuccessNotifMessage(response.data.message)
                props.setSuccessNotifDescription('Cette classe a ete correctement mise a jour, veuillez consulter le catalogue !')
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
                        <svg aria-hidden="true" className="close-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h2 className="  mb-[1rem] text-size-[1.25rem] font-medium text-black dark:text-white">
                        {props.title}
                        </h2>
                    </div>
                    <form className="modal-form">

                        {/* 1 */}
                        <div className="w-full">
                            <label className="form-label form-class mb-2.5 block text-black dark:text-white">
                            Nom de la classe
                            </label>
                            <div className="relative z-20 bg-white dark:bg-form-input">
                            <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                            </span>
                                <select 
                                    value={name}
                                    onChange={handleClasseSelectionChange}
                                    className=" form-label form-class relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:text-white dark:bg-black ">
                                    {CLASSE_LEVEL.map((level, index) => (
                                        <option key={index} value={level.name}>
                                        {level.name}
                                        </option>
                                    ))}
                                </select>
                                <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.8">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* 2 */}

                        <div className="w-full ">
                            <label className="mb-3 block font-medium text-black dark:text-white">
                                Le petit nom
                            </label>
                            <input
                                type="text"
                                value={shortName}
                                disabled
                                className="form-label form-class w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black dark:text-white"
                            />
                        </div>

                        {/* 3 */}

                        {
                            showSpeciality === false  ? null :
                            <div className="w-full ">
                                <label className="form-label form-class  text-black dark:text-white">
                                Spécialité de la classe
                                </label>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                                </span>
                                    <select 
                                        value={speciality!}
                                        onChange={handleSpecialitySelectionChange}
                                        className=" form-label form-class relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:text-white dark:bg-black ">
                                        {allSpecialities.map((level, index) => (
                                            <option key={index} value={level.name}>
                                            {level.name}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g opacity="0.8">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        }

                        

                        
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
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}

export default CreateOrUpdateClasseModal;