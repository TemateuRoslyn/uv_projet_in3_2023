import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import * as XLSX from 'xlsx';
import { connect } from 'react-redux';

import { PERMISSION_COLUMNS_DEFS } from '../../../../configs/ag-grid-column-def/permission';
import { Permission } from '../../../../generated/models';
import { ReduxProps } from '../../../../redux/configureStore';
import { Link } from 'react-router-dom';
import CreateOrUpdatePermissionModal from './CreateOrUpdatePermissionModal';
import { MODAL_MODE } from '../../../../constants/ENUM';



interface DisplayPermissionsProps {
    permissions: Permission [],
    isLoading: boolean,
}



const DisplayPermissions: React.FC<DisplayPermissionsProps> = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<MODAL_MODE>(MODAL_MODE.create);
    const gridRef = useRef<any>(null);

    
    useEffect(() => {        
        onGridReady()
    }, []);

    const onGridReady = useCallback(() => {
        
        // logique a integrer plus tard
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

    const handleNewItem = () => {
        setShowModal(true);
        setModalMode(MODAL_MODE.create)
    }

    const handleExportExcel = () => {
        if (gridRef.current && gridRef.current.api) {      
            const rowData =gridRef.current.api.getSelectedRows();
            if (rowData && rowData.length > 0) {
                const worksheet = XLSX.utils.json_to_sheet(rowData);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Permissions');
                XLSX.writeFile(workbook, 'permissions_data.xlsx');
            } else {
                alert('Veuillez selectionner une ligne !')
            }
        }
    };

    const handleUpdateItem = () => {
        if (gridRef.current && gridRef.current.api) {      
            const rowData =gridRef.current.api.getSelectedRows();
            if (rowData && rowData.length === 1) {
                alert('update logique...')
            } else if (rowData && rowData.length > 1) {
                alert('Vous devez selectionner une seule ligne a supprimer !')
            }else {
                alert('Veuillez selectionner la ligne a modifier !')
            }
        }
    }

    const handleDeleteItem = () => {
        if (gridRef.current && gridRef.current.api) {      
            const rowData =gridRef.current.api.getSelectedRows();
            if (rowData && rowData.length === 1) {
                alert('delete logique...')
            } else if (rowData && rowData.length > 1) {
                alert('Vous devez selectionner une seule ligne a supprimer !')
            }else {
                alert('Veuillez selectionner la ligne a supprimer !')
            }
        }
    }

    const handleRefresh = () => {
        alert('refesh logique...')
    }
    
  
  return (
      <div>
          <div className="mb-3.5 flex flex-wrap gap-1 xl:gap-3 justify-end">
            <Link onClick={handleNewItem} to="#" className="rounded-md inline-flex items-center justify-center  bg-success py-1 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-6">
                Nouveau
            </Link>
        </div>
        <div className="mb-3.5 flex flex-wrap gap-1 xl:gap-3">
            <Link onClick={handleExportExcel} to="#" className="rounded-md inline-flex items-center justify-center  bg-success py-1 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-6">
                Export en Excel
            </Link>

            <Link onClick={handleRefresh} to="#" className="rounded-md inline-flex items-center justify-center  bg-primary py-1 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-6">
                Rafraichir
            </Link>

            <Link to="#" onClick={handleUpdateItem} className="rounded-md inline-flex items-center justify-center  bg-warning py-1 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-6">
                Modifier
            </Link>


            <Link to="#" onClick={handleDeleteItem} className="rounded-md inline-flex items-center justify-center  bg-danger py-1 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-6">
                Supprimer
            </Link>
        </div>

        {showModal && <CreateOrUpdatePermissionModal mode={modalMode}/>}

        <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
            <div className="ag-theme-alpine" style={{height: 500}}>
                <AgGridReact 
                    ref={gridRef}
                    rowData={props.permissions} 
                    animateRows={true} 
                    columnDefs={PERMISSION_COLUMNS_DEFS} 
                    defaultColDef={defaultColDef} 
                    rowSelection={'multiple'}
                    suppressRowClickSelection={true}
                    suppressAggFuncInHeader={true}
                    pagination={true}
                    paginationAutoPageSize={true}
                    paginateChildRows={true}
                    onGridReady={onGridReady}
                /> 
            </div>

        </div>
      </div>
  );
};

function mapStateToProps(state: ReduxProps): ReduxProps {
    return { 
        user: state.user,
        environment: state.environment,
        loggedIn: state.loggedIn,
        access_token: state.access_token,
    };
  } 
  export default connect(mapStateToProps)(DisplayPermissions)
