import { AgGridReact } from 'ag-grid-react';
import * as XLSX from 'xlsx';
import Breadcrumb from '../components/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { Component, useCallback, useEffect, useMemo, useRef, useState } from 'react';

 
class PullComp extends Component {
  render() {
    return (
      <>
        <button onClick={ ()=> window.alert('Pull')}>Pull</button>
        maestros
      </>);
  }
}

const Parents = () => {

  const gridRef = useRef<any>(null);

  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
        { 
          field: 'profession', 
          filter: 'agTextColumnFilter',
          headerCheckboxSelection: true, 
          checkboxSelection: true,
          showDisabledCheckboxes: true,
        },
        { 
          field: 'firstName',
          filter: 'agNumberColumnFilter',
        },
        { 
          field: 'lastName', 
          filter: 'agMultiColumnFilter',
        },
        { field: 'dateDeNaissance',
          filter: 'agSetColumnFilter' ,
        },
        { field: 'lieuDeNaissance',  filter: 'agDateColumnFilter' },
        { field: 'photo' },
        { field: 'sexe' },
        { field: 'telephone' },
  ]);

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(result => result.json())
    .then(rowData => setRowData(rowData))
  }, []);


  const isRowSelectable = useMemo(() => {
    return (params: any) => {
      return !!params.data && params.data.year === 2012;
    };
  }, []);

  const onGridReady = useCallback((params: any) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(result => result.json())
    .then(rowData => setRowData(rowData))
  }, []);

  const onFirstDataRendered = useCallback((params: any) => {
    gridRef.current.api.forEachNode((node: { setSelected: (arg0: boolean) => any; data: { year: number; }; }) =>
      node.setSelected(!!node.data && node.data.year === 2012)
    );
  }, []);

  const onQuickFilterChanged = useCallback(() => {
    const quickFilterValue = document.getElementById('quickFilter')?.value;
    if (gridRef.current && quickFilterValue) {
      const res = gridRef.current.api.setQuickFilter(quickFilterValue);
      
    }
  }, []);


  const defaultColDef = useMemo(() => {
    return {
      minWidth: 100,
      resizable: true,
      sortable: true,
      filter: true,
    };
  }, []);

  const handleExportExcel = () => {
    if (gridRef.current && gridRef.current.api) {      
      const rowData =gridRef.current.api.getSelectedRows();
      if (rowData) {
        const worksheet = XLSX.utils.json_to_sheet(rowData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Parents');
        XLSX.writeFile(workbook, 'parents_data.xlsx');
      }
    }
  };
  
  

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Parents" />
      <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
          <div style={{ marginBottom: '5px' }}>
              <button onClick={handleExportExcel} style={{ fontWeight: 'bold', color: '#fff', backgroundColor: 'green' }}>
                  Export to Excel
                </button>
              <input
                type="text"
                onInput={onQuickFilterChanged}
                id="quickFilter"
                placeholder="quick filter..."
              />
            </div>

          {/* <div className="ag-theme-alpine" style={{ height: 500 }}>
            <AgGridReact 
              ref={gridRef}
              rowData={rowData} 
              animateRows={true} 
              columnDefs={columnDefs} 
              defaultColDef={defaultColDef} 
              rowSelection={'multiple'}
              suppressRowClickSelection={true}
              suppressAggFuncInHeader={true}
              pagination={true}
              paginationAutoPageSize={true}
              paginateChildRows={true}
              // sideBar={'columns'}
              // isRowSelectable={isRowSelectable}
              onGridReady={onGridReady}
              onFirstDataRendered={onFirstDataRendered}     
            /> 
          </div> */}

      </div>
    </DefaultLayout>
  );
};

export default Parents;