import React, { useState } from 'react';
import { TOKEN_LOCAL_STORAGE_KEY, USER_LOCAL_STORAGE_KEY } from '../../../constants/LOCAL_STORAGE';
import { ReparationsApi } from '../../../generated/api';
import { ReduxProps } from '../../../redux/configureStore';
import { useSelector } from "react-redux";
import { SuccessNotification } from '../../common/header/Head';


const FautesSection = ({ fautes }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFaute, setSelectedFaute] = useState(null);
  const [reparationText, setReparationText] = useState('');


  const [showSuccessNotif, setShowSuccessNotif] = useState<boolean>(false);
  const [successNotifMessage, setSuccessNotifMessage] = useState<string>('');
  const [successNotifDescription, setSuccessNotifDescription] = useState<
    string | null
  >(null);

  const state = useSelector((state: ReduxProps) => state);
  const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  const authUser = JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY))


  const handleRepairFaute = (faute) => {
    setSelectedFaute(faute);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedFaute(null);
    setReparationText('');
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
      }).catch((error) => {
        alert(error.response.data.message);
        console.log(error)
      }).finally(() => {
        setTimeout(() => {
          setShowSuccessNotif(false);
        }, 3000);
      });
   
  };

  const user = JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY))
  console.log(user)
  return (

    <div className="mb-6">
      
      <h3 className="text-3xl font-semibold mb-2">Fautes</h3>
            {showSuccessNotif && (<div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className=" shadow-lg text-white rounded-lg p-4 max-w-xl w-[600px] max-h-xl h-[500px]   z-50">
      
        <SuccessNotification
          message={successNotifMessage}
          description={successNotifDescription}
        />
        </div>
      </div>
      )}
      
      
      {fautes.map(faute => (
        <div key={faute.id} className="bg-white shadow-lg rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-lg font-semibold">Faute #{faute.id}</p>
            <p className="text-sm text-gray-500">{faute.create_at}</p>
          </div>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Gravite:</span> {faute.gravite}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Libelle:</span> {faute.libelle}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Regle:</span> {faute.regle.libelle}
          </p>
          {user.roles[0].description === "PARENT" ? "" :
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 mt-4 rounded"
              onClick={() => handleRepairFaute(faute)}
            >
              Reparer la faute
            </button>}
        </div>

      ))}
     
      {showModal && selectedFaute && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white shadow-lg rounded-lg p-4 max-w-xl w-[600px] max-h-xl h-[500px]   z-50">
            <h3 className="text-xl font-semibold mb-4">Reparer la Faute</h3>
            <textarea

            required={true}
              className="w-full h-2/3 rounded border-gray-300 p-2 mb-4"
              rows={4}
              placeholder="Entrer la demarche a suivre pour reparer votre faute..."
              value={reparationText}
              onChange={(e) => setReparationText(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 mr-2 rounded"
                onClick={handleModalClose}
              >
                Close
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
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
