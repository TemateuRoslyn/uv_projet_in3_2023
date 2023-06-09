import React, { useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumb';

const AddConvocations = () => {
  const [libelle, setLibelle] = useState('');
  const [dateConvocation, setDateConvocation] = useState('');
  const [dateRdv, setDateRdv] = useState('');
  const [statut, setStatut] = useState('');
  const [userId, setUserId] = useState('');

  const userOptions = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
  ];


  const formContainerClass = `w-full bg-white dark:bg-gray-800 shadow-md rounded-lg`;
  const labelClass = `block dark:text-white font-bold mb-2`;
  const inputClass = `w-full px-3 py-2 border dark:bg-black dark:text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500`;
  const buttonClass = `bg-indigo-500 dark:text-black dark:bg-white font-semibold px-4 py-2 rounded-md shadow-md hover:bg-indigo-600`;

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Add logic to submit the form data and perform necessary actions
    console.log('Form submitted:', libelle, dateConvocation, dateRdv, statut, userId);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Ajouter une Convocation" />
      <div className={formContainerClass}>
        <form className="dark:bg-black p-5" onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="libelle" className={labelClass}>
              Libelle
            </label>
            <input
              type="text"
              id="libelle"
              className={inputClass}
              value={libelle}
              onChange={(e) => setLibelle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date_convocation" className={labelClass}>
              Date Convocation
            </label>
            <input
              type="date"
              id="date_convocation"
              className={inputClass}
              value={dateConvocation}
              onChange={(e) => setDateConvocation(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date_rdv" className={labelClass}>
              Date RDV
            </label>
            <input
              type="date"
              id="date_rdv"
              className={inputClass}
              value={dateRdv}
              onChange={(e) => setDateRdv(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="statut" className={labelClass}>
              Statut
            </label>
            <input
              type="text"
              id="statut"
              className={inputClass}
              value={statut}
              onChange={(e) => setStatut(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
  <label htmlFor="user_id" className={labelClass}>
    User ID
  </label>
  <select
    id="user_id"
    className={inputClass}
    value={userId}
    onChange={(e) => setUserId(e.target.value)}
    required
  >
    {userOptions.map((user) => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ))}
  </select>
</div>
          <button type="submit" className={buttonClass}>
            Submit
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default AddConvocations;
