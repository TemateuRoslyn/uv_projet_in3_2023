import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumb';

const AdminPermissionForm = () => {
  const [formData, setFormData] = useState({
    Id: '',
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data, such as sending it to an API or updating state
    console.log(formData);
    // Reset the form after submission
    setFormData({
      Id: '',
      name: '',
      description: '',
    });
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="New Permission" />
        <div className="col-span-5 xl:col-span-3">
          <div className="align-content-center col-span-10 md:w-full lg:w-full xl:col-span-3">
            <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="w-full border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h2 className="w-full text-center font-medium text-black dark:text-white">
                  Permission Informations
                </h2>
              </div>
              <div className="p-7">
                <form
                  onSubmit={handleSubmit}
                  className=" container m-2 mx-auto w-full max-w-sm flex-auto gap-2"
                >
                  <div className="relative mb-5.5 flex w-full flex-col gap-5.5 sm:flex-row">
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="email"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                    />
                    <textarea
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      // type="text"
                      name="name"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Description"
                    />
                  </div>
                  {/* ... Other input fields ... */}
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AdminPermissionForm;
