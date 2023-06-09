import React, { useState } from 'react';

const FautesSection = ({ fautes  }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFaute, setSelectedFaute] = useState(null);
  const [reparationText, setReparationText] = useState('');

  const handleRepairFaute = (faute) => {
    setSelectedFaute(faute);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedFaute(null);
    setReparationText('');
  };

  const handleReparationSubmit = () => {
    // Handle reparation submission here
    // You can access the selectedFaute and reparationText values
    // and perform the necessary actions, such as sending an API request
    // to update the faute's repair details.

    // After successful submission, you can close the modal
    handleModalClose();
  };

  return (
    <div className="mb-6">
      <h3 className="text-3xl font-semibold mb-2">Fautes</h3>
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
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 mt-4 rounded"
            onClick={() => handleRepairFaute(faute)}
          >
            Repair Faute
          </button>
        </div>
      ))}
      {showModal && selectedFaute && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
        <div className="bg-white shadow-lg rounded-lg p-4 max-w-xl w-[600px] max-h-xl h-[500px]   z-50">
            <h3 className="text-xl font-semibold mb-4">Repair Faute</h3>
            <textarea
              className="w-full h-2/3 rounded border-gray-300 p-2 mb-4"
              rows={4}
              placeholder="Enter reparation details..."
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
                onClick={handleReparationSubmit}
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
