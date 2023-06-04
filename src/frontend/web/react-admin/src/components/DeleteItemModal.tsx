interface NotificationModalProps {
    itemName?: string,
    onClose: () => void,
    onConfirm: () => void,
    refresh?: () => void,
  }
  
  export const DeleteItemModal: React.FC<NotificationModalProps> = (props) => {
    return (
      <div
        id="popup-modal"
        tabIndex={-1}
        onClick={props.onClose}
        className="top-modal-animation fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0"
      >
        <div className="relative w-full max-w-md" onClick={(event) => event.stopPropagation()}>
          <div className="relative bg-white rounded-lg  dark:bg-gray-700">
            <button
              type="button"
              onClick={props.onClose}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Annuler</span>
            </button>
            <div className="p-6 text-center">
              <svg
                aria-hidden="true"
                className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-black-800 dark:text-black-gray">{`Etes-vous sur de vouloir supprimer ce item: ${props.itemName} ? `}</h3>
              <button
                type="button"
                className="confirm-button"
                onClick={props.onConfirm}
              >
                Oui, je suis certain(e)
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                onClick={props.onClose}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  