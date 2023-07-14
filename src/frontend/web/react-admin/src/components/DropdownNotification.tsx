import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { TOKEN_LOCAL_STORAGE_KEY } from '../constants/LOCAL_STORAGE';
import { SuggestionsApi } from '../generated';
import { Suggestion } from '../generated/models';
import { ReduxProps } from '../redux/configureStore';
import { useSelector } from 'react-redux';
import { MODAL_MODE } from '../constants/ENUM';

import './css/DisplaySuggestion.css';

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
  const state = useSelector((state: ReduxProps) => state);
  const [suggestion, setSuggestion] = useState<Suggestion[]>([]);

  const [showCreateOrUpdateModal, setShowCreateOrUpdateModal] = useState(false);
  const [suggestionItem, setSuggestionItem] = useState<Suggestion>();

  const [modalMode, setModalMode] = useState<MODAL_MODE>(MODAL_MODE.create);
  const [modalTitle, setModalTitle] = useState<string>('');

  useEffect(() => {
    const suggestionApi = new SuggestionsApi({
      ...state.environment,
      accessToken: token,
    });

    suggestionApi
      .suggestionsNotRead('Bearer ' + token)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            setSuggestion(response.data.content);
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
  }, []);

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

  function formatDate(date) {
    const dateOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const datePart = date.toLocaleDateString(undefined, dateOptions);
    const timePart = date.toLocaleTimeString(undefined, timeOptions);
    return `${datePart} ${timePart}`;
  }

  const readAll = (event) => {
    console.log('i am here');
    const suggestionApi = new SuggestionsApi({
      ...state.environment,
      accessToken: token,
    });

    suggestionApi
      .readAllSuggestion('Bearer ' + token)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            setSuggestion([]);
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
  };
  const refresh = () => {
    const suggestionApi = new SuggestionsApi({
      ...state.environment,
      accessToken: token,
    });

    suggestionApi
      .suggestionsNotRead('Bearer ' + token)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            setSuggestion(response.data.content);
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
  };

  const handleItemSelected = (item: Suggestion) => {
    setSuggestionItem(item);
    setShowCreateOrUpdateModal(true);
    setModalMode(MODAL_MODE.view);
    setModalTitle("Détail d'une suggestion");
    const suggestionApi = new SuggestionsApi({
      ...state.environment,
      accessToken: token,
    });

    suggestionApi
      .readSuggestion(item.id, 'Bearer ' + token)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            refresh();
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
  };

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
  }, []);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, []);

  return (
    <div className="justify-content-center w-full items-center justify-center">
      <li className="relative">
        <Link
          ref={trigger}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          to="#"
          className="w-8.5 relative flex h-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        >
          {suggestion.length > 0 ? (
            <span className="text-bold text-xl absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 text-danger">
              {suggestion.length}
              <span className="absolute text-bold z-1 inline-flex h-2 w-2 animate-ping rounded-full bg-meta-1 opacity-75">
                {suggestion.length}
              </span>
            </span>
          ) : (
            <span className="text-bold absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 text-danger">
              {suggestion.length}
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
              d="M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.44678 13.8093 2.39053 13.9499 2.33428 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.2499 16.2562 2.55928 16.2562H8.38115V16.8749C8.38115 17.2124 8.6624 17.5218 9.02803 17.5218C9.36553 17.5218 9.6749 17.2405 9.6749 16.8749V16.2562H15.4687C15.778 16.2562 16.0593 16.0874 16.228 15.8343C16.3968 15.553 16.3968 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.74053 13.6405V7.79053C3.74053 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.528C14.2312 13.9499 14.3437 14.3437 14.5968 14.7374L14.7655 14.9905H3.23428Z"
              fill=""
            />
          </svg>
        </Link>

        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
          className={`absolute -right-27 mt-2.5 flex h-90 w-100  flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${
            dropdownOpen === true ? 'block' : 'hidden'
          }`}
        >
          <div className="flex gap-30 px-4.5 py-3">
            <h5 className="text-sm font-medium text-bodydark2">Suggestion</h5>
            <button
              onClick={() => readAll(event)}
              className="items-center justify-center text-sm sm:items-center"
            >
              Marquer tout comme lu
            </button>
          </div>

          <ul className="flex h-auto flex-col overflow-y-auto">
            {suggestion.length > 0 ? (
              suggestion.map((item, key) => (
                <li key={key}>
                  <Link
                    className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                    onClick={() => handleItemSelected(item)}
                  >
                    <p className="text-sm">
                      <span className="text-black dark:text-white">
                        {item.description}
                      </span>
                    </p>

                    <p className="text-xs">
                      {formatDate(new Date(item.created_at))}
                    </p>
                  </Link>
                </li>
              ))
            ) : (
              <p className="text-center text-sm">
                <span className="text-black dark:text-white">
                  Aucune nouvelle suggestion.
                </span>
              </p>
            )}
            {/* <li>
            <Link
              className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              to="#"
            >
              <p className="text-sm">
                <span className="text-black dark:text-white">
                  There are many variations
                </span>{' '}
                of passages of Lorem Ipsum available, but the majority have
                suffered
              </p>

              <p className="text-xs">01 Dec, 2024</p>
            </Link>
          </li> */}
          </ul>
        </div>
      </li>

      {showCreateOrUpdateModal && (
        <ShowSuggestionModal
          mode={modalMode}
          title={modalTitle}
          onClose={() => setShowCreateOrUpdateModal(false)}
          item={modalMode !== MODAL_MODE.create ? suggestionItem : null}
        />
      )}
    </div>
  );
};

interface ModalProps {
  mode: MODAL_MODE;
  title: string;
  onClose: () => void;
  item?: Suggestion | null;
}

const ShowSuggestionModal: React.FC<ModalProps> = (props) => {
  const [description, setDescription] = useState<string>(
    props.item ? props.item.description : ''
  );

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

  return (
    <div
      id="authentication-modal"
      className="authentication-modal w-230"
      style={{ position: 'relative' }}
      onClick={props.onClose}
    >
      <div
        className="modal-container top-modal-animation relative mx-auto w-230 items-center  justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-content w-150 rounded-sm border border-stroke bg-white bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
              <h2 className="  mb-[1rem] text-size-[1.25rem] font-medium text-black dark:text-white">
                {props.title}
              </h2>
            </div>
            <form className="modal-form">
              <div className="form-group">
                <label
                  htmlFor="description"
                  className="form-label form-class mb-2.5 block text-black dark:text-white"
                >
                  Description
                </label>
                <p
                  id="description"
                  className={` w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black ${
                    props.mode === MODAL_MODE.view ? 'disabled-input' : ''
                  }`}
                >
                  {description}
                </p>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownNotification;
