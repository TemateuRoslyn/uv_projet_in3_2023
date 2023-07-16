import { useState } from "react"
import { Link } from "react-router-dom"
// import { DefaultLayout } from "../../layout/DefaultLayout"
import { Suggestion, SuggestionCreateBody } from "../../../generated/models";
import { SuggestionsApi } from "../../../generated";
import { useSelector } from "react-redux";
import { ReduxProps } from "../../../redux/configureStore";
import { TOKEN_LOCAL_STORAGE_KEY } from "../../../constants/LOCAL_STORAGE";

interface HeaderProps {
  isLoggedIn: boolean
  item?: Suggestion | null;
  // setShowSuccessNotif: (value: boolean) => void;
  // setSuccessNotifMessage: (value: string) => void;
  // setSuccessNotifDescription: (value: string | null) => void;
}

const Head: React.FC<HeaderProps> = (props) => {
  const [showSuccessNotif, setShowSuccessNotif] = useState<boolean>(false);
  const [successNotifMessage, setSuccessNotifMessage] = useState<string>('');
  const [successNotifDescription, setSuccessNotifDescription] = useState<
    string | null
  >(null);
  
  const state = useSelector((state: ReduxProps) => state);
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState('');
  
  const [click, setClick] = useState(false)
  const handleSuggestion = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setDescription('');
  };

  const handleSuggestionSubmit = (_event: any) => {
    _event.preventDefault();

    const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    const suggestionApi = new SuggestionsApi({
      ...state.environment,
      accessToken: token,
    });
    //setIsLoading(true);

    const apiParams: SuggestionCreateBody = {
      description: description,
    
    };
   
    suggestionApi
      .createSuggestion(apiParams, 'Bearer ' + token)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            setSuccessNotifMessage(response.data.message);
            setSuccessNotifDescription(
              "Merci d'avoir suggere!"
            );
            setShowSuccessNotif(true);
            handleModalClose();
          }
        }
      })
      .catch((error) => {
        alert(error?.response?.data?.message);
      })
      .finally(() => {
        // setIsLoading(false);

        setTimeout(() => {
          setShowSuccessNotif(false);
        }, 3000);
      });
  };

  if (props.isLoggedIn) {
    return (
      <>
        <section className='head'>
          <div className='container flexSB'>
            <div className='logo'>
              <div className='gauche'>
                <img src='./images/logo.png' alt='' />
              </div>
              <div className='droite'>
                <h1>SchoolDiscipline</h1>
                <span>Consultez votre état disciplinaire</span>
              </div>
            </div>
  
            <div className='social'>
              <i className='fab fa-facebook-f icon'></i>
              <i className='fab fa-instagram icon'></i>
              <i className='fab fa-twitter icon'></i>
              <i className='fab fa-youtube icon'></i>
            </div>
            <div className="w-2/12 text-right mr-4">
              <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
                <Link onClick={handleSuggestion}>
                  <li className="border p-2 shadow-lg shadow-green-900 rounded-full bg-gradient-to-tr from-amber-700 to-orange-400 hover:from-red-800 hover:to-orange-400">
                    Nous Suggerer
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </section>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-gray-100 shadow-lg rounded-lg p-4 max-w-xl w-[600px] max-h-xl h-[500px]   z-50">
            <h3 className="text-xl font-semibold mb-4 text-center">
            --- Merci de laisser votre suggestion ---
            </h3>
            <textarea
              id="description"
              name="description"
              className="w-full h-3/4 rounded border-gray-300 p-2 mt-3"
              rows={4}
              placeholder="Inserer votre suggestion ici..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              // onChange={handleInputChange}
            ></textarea>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 mr-2 rounded mt-3"
                onClick={handleModalClose}
              >
                Close
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded mt-3"
                onClick={handleSuggestionSubmit}
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
      {/* <DefaultLayout> */}
        {showSuccessNotif && (
          <SuccessNotification
            message={successNotifMessage}
            description={successNotifDescription}
          />
        )}
      {/* </DefaultLayout>       */}
      </>
    )  
  } else {
    return (
      <>
        <section className='head'>
          <div className='container flexSB'>
            <div className='logo'>
              <div className='gauche'>
                <img src='./images/logo.png' alt='' />
              </div>
              <div className='droite'>
                <h1>SchoolDiscipline</h1>
                <span>Consultez votre état disciplinaire</span>
              </div>
            </div>

            <div className='social'>
              <i className='fab fa-facebook-f icon'></i>
              <i className='fab fa-instagram icon'></i>
              <i className='fab fa-twitter icon'></i>
              <i className='fab fa-youtube icon'></i>
            </div>
          </div>
        </section>
      </>
    )
  }
}

interface ModalProps {
  message: string,
  description?: string | null,
}

export const SuccessNotification: React.FC<ModalProps> = (props) => {
  return (
      <div className="top-modal-animation mb-5 flex w-full border-l-6 border-[#34D399] bg-[#05905d] bg-opacity-[15%] px-7 py-5 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
          <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#08a068]">
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                fill="white"
                stroke="white"
              ></path>
            </svg>
          </div>
          <div className="w-full">
            <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#606a66] ">
              {props.message}
            </h5>
            <p className="text-bold">
              <strong>{props.description ? props.description : null}</strong>
            </p>
          </div>
        </div>
  )
}

export default Head
