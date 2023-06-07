// import React from "react";
// import { toast, ToastOptions } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// interface NotificationProps {
//   message: string;
//   type: "success" | "error" | "warning";
// }

// function Notification({ message, type }: NotificationProps) {
//   const showToast = () => {
//     const toastOptions: ToastOptions = {
//       autoClose: 3000, // Durée de fermeture automatique du toast en millisecondes (facultatif)
//     };

//     switch (type) {
//       case "success":
//         toast.success(message, toastOptions);
//         break;
//       case "error":
//         toast.error(message, toastOptions);
//         break;
//       case "warning":
//         toast.warn(message, toastOptions);
//         break;
//       default:
//         toast(message, toastOptions);
//         break;
//     }
//   };

//   return (
//     <button
//       onClick={showToast}
//       className="px-4 py-2 rounded-lg bg-blue-500 text-white"
//     >
//       Afficher le toast
//     </button>
//   );
// }

// export default Notification;
