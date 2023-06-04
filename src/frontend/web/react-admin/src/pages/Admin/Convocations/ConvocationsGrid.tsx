import React, { useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumb';

const ConvocationsGrid = () => {
  const gridRef = useRef(null);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'ID', field: 'id' },
    { headerName: 'Timestamps', field: 'timestamps' },
    { headerName: 'Libelle', field: 'libelle' },
    { headerName: 'Date Convocation', field: 'date_convocation' },
    { headerName: 'Date RDV', field: 'date_rdv' },
    { headerName: 'Statut', field: 'statut' },
    { headerName: 'User ID', field: 'user_id' },
  ]);

  useEffect(() => {
    // Simulating fetching data from an API
    const fetchData = async () => {
      try {
        // Replace this with your API call to fetch convocations data
        const response = await fetch('https://api.example.com/convocations');
        const data = await response.json();
        setRowData(data);
      } catch (error) {
        console.error('Error fetching convocations data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName='Convocations'/>
      <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{
          flex: 1,
          minWidth: 100,
          sortable: true,
          filter: true,
        }}
      />
    </div>
    </DefaultLayout>
    
  );
};

export default ConvocationsGrid;
