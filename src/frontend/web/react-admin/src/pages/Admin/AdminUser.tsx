{
  /* import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumb';
import { Link } from 'react-router-dom';

const AdminUser = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = () => {
    const allItems = document.querySelectorAll('input[type="checkbox"]');
    const itemIds = Array.from(allItems)
      .filter((item) => item.id !== 'checkbox-all')
      .map((item) => item.id);

    setSelectAll(!selectAll);
    setSelectedItems(selectAll ? [] : itemIds);
  };

  const handleCheckboxChange = (e) => {
    const itemId = e.target.id;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, itemId]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((id) => id !== itemId)
      );
    }
  };

  const handleItemSelect = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((item) => item !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  return (
    <DefaultLayout>
      <div className="">
        <Breadcrumb pageName="Users" />

        <h1 className="mb-4 text-2xl font-bold">Users List</h1>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            <input
              type="text"
              placeholder="Search"
              className="border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 ml-2 rounded-md border px-2 py-1 focus:outline-none"
            />
          </h2>

          <nav>
            <ol className="flex items-center gap-2">
              <button className="flex justify-center rounded bg-success px-3 py-1 font-medium text-gray hover:shadow-1 ">
                <Link to="/admin/newuser">Add - User</Link>
              </button>
            </ol>
          </nav>
        </div>

        <div className="col-span-full flex w-full flex-col rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-full xl:pb-1">
          <div className="shadow-md sm:rounded-lg">
            <div className=" min-w-full  ">
              <div className="">
                <table className="divide-gray-200 dark:divide-gray-700 min-w-full table-fixed divide-y">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-all"
                            type="checkbox"
                            className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                            //onChange={handleCheckboxChange}
                            checked={selectAll}
                            onChange={handleSelectAll}
                          />
                          <label htmlFor="checkbox-all" className="sr-only">
                            checkbox
                          </label>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="text-gray-700 dark:text-gray-400 py-3 px-6 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Photo
                      </th>
                      <th
                        scope="col"
                        className="text-gray-700 dark:text-gray-400 py-3 px-6 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="text-gray-700 dark:text-gray-400 py-3 px-6 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="text-gray-700 dark:text-gray-400 py-3 px-6 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        First Name
                      </th>
                      <th
                        scope="col"
                        className="text-gray-700 dark:text-gray-400 py-3 px-6 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Last Name
                      </th>
                      <th
                        scope="col"
                        className="text-gray-700 dark:text-gray-400 py-3 px-6 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Date of Birth
                      </th>
                      <th
                        scope="col"
                        className="text-gray-700 dark:text-gray-400 py-3 px-6 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Place of Birth
                      </th>

                      <th
                        scope="col"
                        className="text-gray-700 dark:text-gray-400 py-3 px-6 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Gender
                      </th>
                      <th
                        scope="col"
                        className="text-gray-700 dark:text-gray-400 py-3 px-6 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Telephone
                      </th>
                      <th
                        scope="col"
                        className="text-gray-700 dark:text-gray-400 py-3 px-6 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 divide-y bg-white dark:bg-black">
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-1"
                            type="checkbox"
                            className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                            //onChange={handleCheckboxChange}
                            checked={selectAll}
                            onChange={() =>
                              handleItemSelect('checkbox-table-1')
                            }
                          />
                          <label htmlFor="checkbox-table-1" className="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td className="text-gray-900 whitespace-nowrap py-4 px-6 text-sm font-medium dark:text-white">
                        <img
                          src="user1.jpg"
                          alt="User Photo"
                          className="h-8 w-8 rounded-full"
                        />
                      </td>
                      <td className="text-gray-900 whitespace-nowrap py-4 px-6 text-sm font-medium dark:text-white">
                        user1@example.com
                      </td>
                      <td className="text-gray-500 whitespace-nowrap py-4 px-6 text-sm font-medium dark:text-white">
                        John Doe
                      </td>
                      <td className="text-gray-900 whitespace-nowrap py-4 px-6 text-sm font-medium dark:text-white">
                        John
                      </td>
                      <td className="text-gray-900 whitespace-nowrap py-4 px-6 text-sm font-medium dark:text-white">
                        Doe
                      </td>
                      <td className="text-gray-900 whitespace-nowrap py-4 px-6 text-sm font-medium dark:text-white">
                        1990-01-01
                      </td>
                      <td className="text-gray-900 whitespace-nowrap py-4 px-6 text-sm font-medium dark:text-white">
                        City
                      </td>

                      <td className="text-gray-900 whitespace-nowrap py-4 px-6 text-sm font-medium dark:text-white">
                        Male
                      </td>
                      <td className="text-gray-900 whitespace-nowrap py-4 px-6 text-sm font-medium dark:text-white">
                        1234567890
                      </td>
                      <td className="text-gray-900 whitespace-nowrap py-4 px-6 text-sm font-medium dark:text-white">
                        <div className="block ">
                          <button className="flex justify-center rounded bg-primary px-3 py-1  font-medium text-gray hover:shadow-1">
                            View
                          </button>
                          <br></br>
                          <button className="flex justify-center rounded bg-secondary px-3 py-1 font-medium text-gray hover:shadow-1">
                            Edit
                          </button>
                          <br></br>
                          <button className="flex justify-center rounded bg-danger px-3 py-1 font-medium text-gray hover:shadow-1">
                            Delete
                          </button>
                          <br></br>
                        </div>
                      </td>
                    </tr>
                    // Add more rows for other users
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AdminUser;
*/
}
import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import * as XLSX from 'xlsx';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumb';

const UserGrid = () => {
  const gridRef = useRef(null);

  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'ID', field: 'id' },
    { headerName: 'Image', field: 'image' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'First Name', field: 'firstName' },
    { headerName: 'Last Name', field: 'lastName' },
    { headerName: 'Date of Birth', field: 'date of birth' },
    { headerName: 'Place of Birth', field: 'place of birth' },
    { headerName: 'Gender', field: 'gender' },
    { headerName: 'Phone', field: 'phone' },
    { headerName: 'Actions', field: 'actions' },
  ]);

  useEffect(() => {
    // Simulating fetching data from an API
    const fetchData = async () => {
      try {
        // Replace this with your API call to fetch user data
        const response = await fetch('https://api.example.com/users');
        const data = await response.json();
        setRowData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleExportExcel = () => {
    if (gridRef.current && gridRef.current.api) {
      const selectedData = gridRef.current.api.getSelectedRows();
      if (selectedData.length > 0) {
        // Perform export logic here
        console.log('Exporting selected data:', selectedData);
      } else {
        // Perform export logic for all data here
        console.log('Exporting all data:', rowData);
      }
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />
      <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
        <div>
          <h2>User Grid</h2>
          <button onClick={handleExportExcel}>Export to Excel</button>
          <div
            className="ag-theme-alpine"
            style={{ height: '500px', width: '100%' }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              rowSelection={'multiple'}
              defaultColDef={{
                flex: 1,
                minWidth: 100,
                sortable: true,
                filter: true,
              }}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UserGrid;
