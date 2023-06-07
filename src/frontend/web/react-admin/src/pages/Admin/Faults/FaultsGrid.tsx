import React, { useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumb';


const FaultsGrid = () => {
  const gridRef = useRef(null);

  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'ID', field: 'id' },
    { headerName: 'Timestamps', field: 'timestamps' },
    { headerName: 'Libelle', field: 'libelle' },
    { headerName: 'Gravite', field: 'gravite' },
    { headerName: 'Eleve ID', field: 'eleve_id' },
    { headerName: 'Regle ID', field: 'regle_id' },
    { headerName: 'Actions', field: 'actions' },
  ]);

  useEffect(() => {
    // Simulating fetching data from an API
    const fetchData = async () => {
      try {
        // Replace this with your API call to fetch fautes data
        const response = await fetch('https://api.example.com/fautes');
        const data = await response.json();
        setRowData(data);
      } catch (error) {
        console.error('Error fetching fautes data:', error);
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
      <Breadcrumb pageName="Fautes" />
      <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
        <div>
          <h2>Fautes Grid</h2>
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

export default FaultsGrid;
