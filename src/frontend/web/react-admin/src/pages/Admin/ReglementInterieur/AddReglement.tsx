import React , {useState}from 'react'
import DefaultLayout from '../../../layout/DefaultLayout'
import Breadcrumb from '../../../components/Breadcrumb'

const AddReglement = () => {


  const formContainerClass = `w-full bg-white dark:bg-gray-800  shadow-md rounded-lg`;
  const labelClass = `block dark:text-white font-bold mb-2`;
  const inputClass = `w-full px-3 py-2 border dark:bg-black dark:text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500`;
  const buttonClass = `bg-indigo-500 dark:text-black dark:bg-white font-semibold px-4 py-2 rounded-md shadow-md hover:bg-indigo-600`;


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
            name='libelle'
            className={inputClass}
            // Add necessary props and event handlers
          />
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

export default AddReglement;
