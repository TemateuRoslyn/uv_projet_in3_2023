interface NotificationModalProps {
  itemName?: string;
  onClose: () => void;
  onConfirm: () => void;
  refresh?: () => void;
}

export const DeleteItemModal: React.FC<NotificationModalProps> = (props) => {
  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      onClick={props.onClose}
      className="top-modal-animation   fixed top-0 left-0 right-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0"
    >
      <div
        className="relative w-full max-w-md"
        onClick={(event) => event.stopPropagation()}
      >
        <div className=" relative rounded-lg bg-white  dark:bg-black">
          <button
            type="button"
            onClick={props.onClose}
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
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
          <div className=" p-6 text-center">
            <svg
              aria-hidden="true"
              className="text-gray-400 dark:text-gray-200 mx-auto mb-4 h-14 w-14"
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
            <h3 className="text-black-800 dark:text-black-gray mb-5 text-lg font-normal">{`Etes-vous sur de vouloir supprimer ce item: ${props.itemName} ? `}</h3>
            <button
              type="button"
              className="hover:bg-gray-100 focus:ring-red-200 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:focus:ring-gray-600 rounded-lg border bg-white px-5 py-2.5 text-sm font-medium text-danger hover:text-graydark focus:z-10 focus:outline-none focus:ring-4 dark:hover:bg-graydark dark:hover:text-white"
              onClick={props.onConfirm}
            >
              Oui, je suis certain(e)
            </button>
            <button
              data-modal-hide="popup-modal"
              type="button"
              onClick={props.onClose}
              className="text-gray-500 focus:ring-gray-200 border-gray-200 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-600 rounded-lg border bg-white px-5 py-2.5 text-sm font-medium hover:bg-graydark focus:z-10 focus:outline-none focus:ring-4 dark:hover:text-white"
            >
              No, annuler
            </button>
          </div>
          DisplayConvocations
        </div>
      </div>
    </div>
  );
};
