import React , {useState}from 'react'
import DefaultLayout from '../../../layout/DefaultLayout'
import Breadcrumb from '../../../components/Breadcrumb'

const AddFaults = () => {

  const formContainerClass = `w-full bg-white dark:bg-gray-800  shadow-md rounded-lg`;
  const labelClass = `block dark:text-white font-bold mb-2`;
  const inputClass = `w-full px-3 py-2 border dark:bg-black dark:text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500`;
  const buttonClass = `bg-indigo-500 dark:text-black dark:bg-white font-semibold px-4 py-2 rounded-md shadow-md hover:bg-indigo-600`;


  const eleveOptions = [
    { id: 1, name: 'Eleve 1' },
    { id: 2, name: 'Eleve 2' },
    { id: 3, name: 'Eleve 3' },
  ];

  const regleOptions = [
    { id: 1, name: 'Regle 1' },
    { id: 2, name: 'Regle 2' },
    { id: 3, name: 'Regle 3' },
  ];



  return (
    <DefaultLayout>
      <Breadcrumb pageName='Ajouter une Fautes'/>
      <div className={formContainerClass}>
      <form className='dark:bg-black p-5'>
        <div className="mb-4">
          <label htmlFor="libelle" className={labelClass}>
            Libelle
          </label>
          <input
            type="text"
            id="libelle"
            className={inputClass}
            // Add necessary props and event handlers
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gravite" className={labelClass}>
            Gravite
          </label>
          <input
            type="text"
            id="gravite"
            className={inputClass}
            // Add necessary props and event handlers
          />
        </div>
        <div className="mb-4">
          <label htmlFor="eleve_id" className={labelClass}>
            Eleve ID
          </label>
          <select id="eleve_id" className={inputClass}>
            {eleveOptions.map((eleve) => (
              <option key={eleve.id} value={eleve.id}>
                {eleve.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="regle_id" className={labelClass}>
            Regle ID
          </label>
          <select id="regle_id" className={inputClass}>
            {regleOptions.map((regle) => (
              <option key={regle.id} value={regle.id}>
                {regle.name}
              </option>
            ))}
          </select>
        </div>
        {/* Add more form fields here */}
        <button
          type="submit"
          className={buttonClass}
        >
          Submit
        </button>
      </form>
      
    </div>
    
    </DefaultLayout>
  )
}

export default AddFaults
