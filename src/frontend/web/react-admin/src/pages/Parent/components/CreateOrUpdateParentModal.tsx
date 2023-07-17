import { ChangeEvent, useEffect, useState } from 'react';
import { MODAL_MODE } from '../../../constants/ENUM';
import { EditIcon, NewIcon } from '../../../components/Icone';
import { Eleve, Parents, ParentsCreateBody } from '../../../generated/models';
import { TOKEN_LOCAL_STORAGE_KEY } from '../../../constants/LOCAL_STORAGE';
import { CoursApi, ElevesApi, ParentsApi } from '../../../generated/api';
import { useSelector } from 'react-redux';
import { ReduxProps } from '../../../redux/configureStore';
import Indicator from '../../Authentication/components/Indicator';
import {
  CLASSE_LEVEL,
  SEXE,
  SOLVABLE,
  STATUS,
  getClasseByName,
} from '../../../constants/ITEMS';
import CustomSelectInput from '../../../components/CustomSelects/CustomSelectInput';
import CustomMultiSelectInput from '../../../components/CustomSelects/CustomMultiSelectInput';

interface ModalProps {
  mode: MODAL_MODE;
  title: string;
  onClose: () => void;
  refresh?: () => void;
  item?: Parents | null;

  setShowSuccessNotif: (value: boolean) => void;
  setSuccessNotifMessage: (value: string) => void;
  setSuccessNotifDescription: (value: string | null) => void;

  setShowWarning: (value: boolean) => void;
  setWarningMessage: (value: string) => void;
  setWarningNotifDescription: (value: string | null) => void;
}

const CreateOrUpdateParentModal: React.FC<ModalProps> = (props) => {
  const state = useSelector((state: ReduxProps) => state);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formValues, setFormValues] = useState({
    firstName: props.item ? props.item.firstName : '',
    lastname: props.item ? props.item.lastName : '',
    telephone: props.item ? props.item.telephone : '',
    email: props.item ? props.item.user?.email : '',
    dateDeNaissance: props.item ? props.item.dateDeNaissance : '',
    lieuDeNaissance: props.item ? props.item.lieuDeNaissance : '',
    photo: props.item ? props.item.photo : null,
    sexe: props.item ? props.item.sexe : 'Masculin',
    profession: props.item ? props.item.profession : '',
    //username: props.item ? props.item.username?.id : '',
  });
  const [eleveIds, setEleveIds] = useState<number[]>(
    props.item ? props.item.eleves.map((eleveItem: Eleve) => eleveItem.id) : []
  );

  console.log(props.item)
  const [matchList, setMatchList] = useState<string[]>([]);

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

  const addId = (id: number): void => {
    setEleveIds((prevIds) => [...prevIds, id]);
  };

  const removeId = (id: number): void => {
    setEleveIds((prevIds) => prevIds.filter((prevId) => prevId === id));
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

  const handleOptionSelect = (option: string[]) => {
    if (option.length < eleveIds.length) {
      // Removing IDs
      console.log(option, eleveIds);
      const selectedIds: (number | null)[] = option.map((item) =>
        extractIdFromString(item)
      );

      setEleveIds(selectedIds);
      console.log('removing ');
    } else {
      // Adding IDs
      console.log(option, eleveIds);
      console.log('adding ');
      option.forEach((item) => {
        const id = extractIdFromString(item);
        if (id !== null && !eleveIds.includes(id)) {
          addId(id);
          console.log('adding ' + id);
        }
      });
    }
    console.log(eleveIds);
  };

  const handleCreate = (_event: React.FormEvent) => {
    _event.preventDefault(); // stopper la soumissoin par defaut du formulaire...

    const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    const parentsApi = new ParentsApi({
      ...state.environment,
      accessToken: token,
    });

    setIsLoading(true);

    const apiParams: ParentsCreateBody = {
      email: formValues.email,
      firstName: formValues.firstName,
      lastName: formValues.lastname,
      profession: formValues.profession,
      sexe: formValues.sexe,
      eleveIds: eleveIds,
      lieuDeNaissance: formValues.lieuDeNaissance,
      dateDeNaissance: formValues.dateDeNaissance,
      telephone: formValues.telephone,
      photo: formValues.photo.name,
    };

    console.log(apiParams);

    parentsApi
      .createParent(
        formValues.email,
        formValues.firstName,
        formValues.lastname,
        formValues.dateDeNaissance,
        formValues.lieuDeNaissance,
        formValues.photo,
        formValues.sexe,
        formValues.telephone,
        formValues.profession,
        eleveIds,
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
              "Une nouvelle parent viens d'etre rajoutee au catalogue avec success ! "
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
    const parentsApi = new ParentsApi({
      ...state.environment,
      accessToken: token,
    });

    setIsLoading(true);

    console.log(formValues, props.item.id);

    parentsApi
      .updateParent(
        formValues.email,
        formValues.firstName,
        formValues.lastname,
        formValues.dateDeNaissance,
        formValues.lieuDeNaissance,
        formValues.photo,
        formValues.sexe,
        formValues.telephone,
        formValues.profession,
        eleveIds,

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
              "Cet parent viens d'etre modifie(e), vous pouvez le consulter  au catalogue avec success ! "
            );
            props.setShowSuccessNotif(true);
          }
        }
      })
      .catch((error) => {
        console.log(error);
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
              <h3 className=" font-medium text-black dark:text-white">
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
                      First name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="firstName"
                      value={formValues.firstName}
                      onChange={handleInputChange}
                      required
                      type="text"
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/3">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Last name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="lastname"
                      value={formValues.lastname}
                      onChange={handleInputChange}
                      required
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Telephone <span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="telephone"
                      value={formValues.telephone}
                      onChange={handleInputChange}
                      required
                      type="text"
                      placeholder="Le numero du parent"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                {/* row 2 class, serie, photo*/}
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-5/6">
                    <label className="mb-3 block text-black dark:text-white">
                      Ajouter un photo de profile
                    </label>
                    <input
                      type="file"
                      name="photo"
                      accept="image/jpeg,image/png"
                      onChange={handleInputChange}
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                    {formValues.photo && (
                      <p>Selected File: {formValues.photo.name}</p>
                    )}
                  </div>

                  <div className="w-full xl:w-1/3">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Profession <span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="profession"
                      value={formValues.profession}
                      onChange={handleInputChange}
                      required
                      type="text"
                      placeholder="Enter your profession"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <CustomMultiSelectInput
                    inputLabel={'Eleves'}
                    inputPlaceholder={'Selection les enfants du parent'}
                    required={true}
                    wrapperStyle="w-full"
                    labelStyle="mb-2.5 block text-black dark:text-white"
                    inputStyle="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    maxHeightList={100}
                    selectOptionEvent={handleOptionSelect}
                    typingInputEvent={handleTypingInput}
                    matchList={matchList}
                  />
                </div>

                {/* row 3  sexe, status, email*/}
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/3">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Sexe <span className="text-meta-1">*</span>
                    </label>
                    <select
                      name="sexe"
                      value={formValues.sexe}
                      onChange={handleInputChange}
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      {SEXE.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Email <span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="email"
                      value={formValues.email}
                      onChange={handleInputChange}
                      required
                      type="email"
                      placeholder="Enter your Email Address"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/3 ">
                    <label className="mb-3 block text-black dark:text-white">
                      Date de naissance <span className="text-meta-1">*</span>
                    </label>
                    <div className="relative">
                      <input
                        name="dateDeNaissance"
                        value={formValues.dateDeNaissance}
                        onChange={handleInputChange}
                        type="date"
                        className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Lieu de Naissance <span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="lieuDeNaissance"
                      value={formValues.lieuDeNaissance}
                      onChange={handleInputChange}
                      required
                      type="text"
                      placeholder="Enter your Place of Birth"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                {/* row 5 create | update, annuler */}
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrUpdateParentModal;
