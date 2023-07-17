import React, { useState } from "react";
import {
  TOKEN_LOCAL_STORAGE_KEY,
  USER_LOCAL_STORAGE_KEY,
} from "../../../constants/LOCAL_STORAGE";
import { ReparationsApi } from "../../../generated/api";
import { ReduxProps } from "../../../redux/configureStore";
import { useSelector } from "react-redux";
import { SuccessNotification } from "../../common/header/Head";

const FautesSection = ({ fautes, reparations }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFaute, setSelectedFaute] = useState(null);
  const [reparationText, setReparationText] = useState("");

  const [showSuccessNotif, setShowSuccessNotif] = useState<boolean>(false);
  const [successNotifMessage, setSuccessNotifMessage] = useState<string>("");
  const [successNotifDescription, setSuccessNotifDescription] = useState<
    string | null
  >(null);

  const state = useSelector((state: ReduxProps) => state);
  const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  const authUser = JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY));

  const handleRepairFaute = (faute) => {
    setSelectedFaute(faute);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedFaute(null);
    setReparationText("");
  };

  const handleReparationSubmit = (selectedFaute) => {
    // Handle reparation submission here
    // You can access the selectedFaute and reparationText values
    // and perform the necessary actions, such as sending an API request
    // to update the faute's repair details.

    // After successful submission, you can close the modal
    handleModalClose();
    const apiReparation = new ReparationsApi({
      ...state.environment,
      accessToken: token,
    });
    console.log("here");
    apiReparation
      .createReparation(reparationText, selectedFaute.id, "Bearer " + token)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            console.log(response.data);
            setSuccessNotifMessage(response.data.message);
            setSuccessNotifDescription(
              "Votre reparation est en attente de validation !"
            );
            setShowSuccessNotif(true);
          }
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setShowSuccessNotif(false);
        }, 3000);
      });
  };

  console.log(reparations);

  const user = JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY));
  console.log(user);
  return (
    <div className="mb-6">
      <h3 className="mb-2 text-3xl font-semibold">Fautes</h3>
      {showSuccessNotif && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className=" max-h-xl z-50 h-[500px] w-[600px] max-w-xl rounded-lg p-4 text-white   shadow-lg">
            <SuccessNotification
              message={successNotifMessage}
              description={successNotifDescription}
            />
          </div>
        </div>
      )}

      {fautes.map((faute) => (
        <div key={faute.id} className="mb-4 rounded-lg bg-white p-4 shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-lg font-semibold">Faute #{faute.id}</p>
            <p className="text-sm text-gray-500">{faute.create_at}</p>
          </div>
          <p className="mb-2 text-gray-700">
            <span className="font-semibold">Gravite:</span> {faute.gravite}
          </p>
          <p className="mb-2 text-gray-700">
            <span className="font-semibold">Libelle:</span> {faute.libelle}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Regle:</span> {faute.regle.libelle}
          </p>
          <div className="flex gap-2 text-center">
          {user.roles[0].description === "PARENT" ? (
            reparations &&
            reparations.some(
              (reparation) => reparation.fauteId === faute.id
            ) ? (
              reparations.map((reparation) => {
                if (reparation.fauteId === faute.id) {
                  if (reparation.statut === "valid") {
                    return (
                      <p className="bg-success mt-4 rounded px-4 py-2 font-semibold text-white">
                        Réparé (Validé)
                      </p>
                    );
                  } else if (reparation.status === "Rejete") {
                    return (
                      <p className="mt-4 rounded bg-red-500 px-4 py-2 font-semibold text-white">
                        Réparé (Rejeté)
                      </p>
                    );
                  } else {
                    return (
                      <p className="mt-4 rounded bg-orange-500 px-4 py-2 font-semibold text-white">
                       <span> Réparé (En attente)</span>
                      </p>
                    );
                  }
                }
                return null;
              })
            ) : (
              <p className="bg-success mt-4 rounded px-4 py-2 font-semibold text-white">
                Non Réparé
              </p>
            )
          ) : reparations &&
            reparations.some(
              (reparation) => reparation.fauteId === faute.id
            ) ? (
            reparations.map((reparation) => {
              if (reparation.fauteId === faute.id) {
                if (reparation.status === "Valide") {
                  return (
                    <p className="text-success mt-4 text-black">
                      Réparé (Validé)
                    </p>
                  );
                } else if (reparation.statut === "rejected") {
                  return (
                    <p className="mt-4 text-black text-red-500">
                      Réparé (Rejeté)
                    </p>
                  );
                } else {
                  return (
                    <p className="mt-4 text-black text-orange-500">
                      Réparé (En attente)
                    </p>
                  );
                }
              }
              return null;
            })
          ) : (
            <button
              className="mt-4 rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
              onClick={() => handleRepairFaute(faute)}
            >
              Réparer la faute
            </button>
          )}
          </div>
        </div>
      ))}

      {showModal && selectedFaute && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="max-h-xl z-50 h-[500px] w-[600px] max-w-xl rounded-lg bg-white p-4   shadow-lg">
            <h3 className="mb-4 text-xl font-semibold">Reparer la Faute</h3>
            <textarea
              required={true}
              className="mb-4 h-2/3 w-full rounded border-gray-300 p-2"
              rows={4}
              placeholder="Entrer la demarche a suivre pour reparer votre faute..."
              value={reparationText}
              onChange={(e) => setReparationText(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                className="mr-2 rounded bg-gray-500 px-4 py-2 font-semibold text-white hover:bg-gray-600"
                onClick={handleModalClose}
              >
                Close
              </button>
              <button
                className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
                onClick={() => handleReparationSubmit(selectedFaute)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FautesSection;
