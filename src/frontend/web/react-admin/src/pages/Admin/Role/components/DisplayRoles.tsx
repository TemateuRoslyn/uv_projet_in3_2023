import { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import * as XLSX from 'xlsx';
import { connect, useSelector } from 'react-redux';

import { ROLE_COLUMNS_DEFS } from '../../../../configs/ag-grid-column-def/role';
import { Role } from '../../../../generated/models';
import { ReduxProps } from '../../../../redux/configureStore';
import { Link } from 'react-router-dom';
import CreateOrUpdateRoleModal from './CreateOrUpdateRoleModal';
import { MODAL_MODE } from '../../../../constants/ENUM';

import { 
    EditIcon, 
    ExcelIcon, 
    EyeIcon, 
    NewIcon, 
    RefreshIcon, 
    TrashIcon 
} from '../../../../components/Icone';

import './DisplayRoles.css'
import { AgGridIndicator } from '../../../../components/AgGridIndicator';
import { RolesApi } from '../../../../generated';
import { TOKEN_LOCAL_STORAGE_KEY } from '../../../../constants/LOCAL_STORAGE';
import { DeleteItemModal } from '../../../../components/DeleteItemModal';



interface DisplayRolesProps {
    roles: Role [],
    isLoading: boolean,

    setShowSuccessNotif: (value: boolean) => void,
    setSuccessNotifMessage: (value: string) => void,
    setSuccessNotifDescription: (value: string | null) => void,
    
    setShowWarning: (value: boolean) => void,
    setWarningMessage: (value: string) => void,
    setWarningNotifDescription: (value: string | null) => void,
    
    setShowDangerNotif: (value: boolean) => void,
    setDangerNotifMessage: (value: string) => void,
    setDangerNotifDescription: (value: string | null) => void,
}

const DisplayRoles: React.FC<DisplayRolesProps> = (props) => {

    const state = useSelector((state: ReduxProps) => state);
    const [roles, setRoles] = useState<Role[]>(props.roles);
    const [role, setRole] = useState<Role>(props.roles[0]);

    const [showCreateOrUpdateModal, setShowCreateOrUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [modalMode, setModalMode] = useState<MODAL_MODE>(MODAL_MODE.create);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [showIndicator, setShowIndicator] = useState<boolean>(false);

    const gridRef = useRef<any>(null);

    const onGridReady = useCallback(() => {
        const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
        const rolesApi = new RolesApi({...state.environment, accessToken: token});

        setShowIndicator(true)
        
        rolesApi.rolesIndex('Bearer ' + token)
        .then((response) => {  
        if(response && response.data){                    
            if(response.data.success === true){ 
                setRoles(response.data.content) 
            }
        }
        })
        .catch((error) => {
            alert(error?.response?.data?.message)
        })
        .finally(() => {
            setShowIndicator(false)
        });  
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
        setShowCreateOrUpdateModal(true);
        setModalMode(MODAL_MODE.create)
        setModalTitle("Créer un nouveau role")
    }

    const handleExportExcel = () => {
        if (gridRef.current && gridRef.current.api) {      
            const rowData =gridRef.current.api.getSelectedRows();
            if (rowData && rowData.length > 0) {
                const worksheet = XLSX.utils.json_to_sheet(rowData);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Roles');
                XLSX.writeFile(workbook, 'roles_data.xlsx');
            } else {
                alert('Veuillez selectionner une ligne !')
            }
        }
    };

    const handleUpdateItem = () => {
        if (gridRef.current && gridRef.current.api) {      
            const rowData =gridRef.current.api.getSelectedRows();
            if (rowData && rowData.length === 1) {
                setRole(rowData[0])
                setShowCreateOrUpdateModal(true);
                setModalMode(MODAL_MODE.update)
                setModalTitle("Modifier un role")
            } else if (rowData && rowData.length > 1) {
                alert('Vous devez selectionner une seule ligne a supprimer !')
            }else {
                alert('Veuillez selectionner la ligne a modifier !')
            }
        }
    }

    const handleViewItem = () => {
        if (gridRef.current && gridRef.current.api) {      
            const rowData =gridRef.current.api.getSelectedRows();
            if (rowData && rowData.length === 1) {
                setRole(rowData[0])
                setShowCreateOrUpdateModal(true);
                setModalMode(MODAL_MODE.view)
                setModalTitle("Detail d'un role")
            } else if (rowData && rowData.length > 1) {
                alert('Vous devez selectionner une seule ligne pour voir les details !')
            }else {
                alert('Veuillez selectionner la ligne a observer !')
            }
        }
    }

    const handleDeleteItem = () => {
        if (gridRef.current && gridRef.current.api) {      
            const rowData =gridRef.current.api.getSelectedRows();
            if (rowData && rowData.length === 1) {
                setRole(rowData[0])
                setShowDeleteModal(true)
            } else if (rowData && rowData.length > 1) {
                alert('Vous devez selectionner une seule ligne a supprimer !')
            }else {
                alert('Veuillez selectionner la ligne a supprimer !')
            }
        }
    }

    const proccessDeleteItem = () => {

        const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
        const rolesApi = new RolesApi({...state.environment, accessToken: token});

        setShowIndicator(true)

        rolesApi.deleteRole('Bearer ' + token, role.id)
        .then((response) => {  
        if(response && response.data){                    
            if(response.data.success === true){ 
                setShowDeleteModal(false)
                onGridReady()                

                // notification
                props.setDangerNotifMessage(response.data.message)
                props.setDangerNotifDescription('Cette role a ete supprimee avec success')
                props.setShowDangerNotif(true)
            }
        }
        })
        .catch((error) => {
            alert(error?.response?.data?.message)
        })
        .finally(() => {

            setShowIndicator(false)

            // notification
            setTimeout(() => {
                props.setShowDangerNotif(false)
              }, 3000);
        });  
    
    }

  const shared_class: string = 'rounded-md inline-flex items-center justify-center gap-2.5 py-2 sm:py-2  px-1 text-center font-medium text-white hover:bg-opacity-90 sm:px-2 md:px-3 lg:px-3 xl:px-3'

  return (
      <div>
        <div className="mb-3.5 flex flex-wrap gap-1 xl:gap-3 justify-end">
            <Link onClick={handleNewItem} to="#" className={`${shared_class}`} style={{backgroundColor: '#057a4f'}}>
                <NewIcon size={2} color='#fff' />
                Nouveau
            </Link>
        </div>
        <div className="mb-3.5 flex flex-wrap gap-1 xl:gap-3">
            <Link onClick={handleExportExcel} to="#" className={`bg-success ${shared_class}`}>
                <ExcelIcon size={18} color='#fff'  />
                Export en Excel
            </Link>

            <Link onClick={onGridReady} to="#" className={`bg-secondary ${shared_class}`}>
                <RefreshIcon size={18} color='#fff' />
                Rafraichir
            </Link>

            <Link to="#" onClick={handleViewItem} className={`bg-success ${shared_class}`}>
                <EyeIcon size={18} color='#fff' />
                View
            </Link>

            <Link to="#" onClick={handleUpdateItem} className={`bg-primary ${shared_class}`}>
                <EditIcon size={18} color='#fff' />
                Modifier
            </Link>

            <Link to="#" onClick={handleDeleteItem} className={`bg-danger ${shared_class}`}>
                <TrashIcon size={18} color='#fff' />
                Supprimer
            </Link>


        </div>

        {showCreateOrUpdateModal && <CreateOrUpdateRoleModal 
                                        mode={modalMode} 
                                        title={modalTitle} 
                                        onClose={() => setShowCreateOrUpdateModal(false)} 
                                        refresh={onGridReady}
                                        item={modalMode !== MODAL_MODE.create ? role : null } 
                                        setShowSuccessNotif={props.setShowSuccessNotif}
                                        setSuccessNotifMessage={props.setSuccessNotifMessage}
                                        setSuccessNotifDescription={props.setSuccessNotifDescription}
                                        setShowWarning={props.setShowWarning}
                                        setWarningMessage={props.setWarningMessage}
                                        setWarningNotifDescription={props.setWarningNotifDescription}
                                    />}

        {showDeleteModal && <DeleteItemModal 
                                itemName={role.name} 
                                onClose={() => setShowDeleteModal(false)} 
                                refresh={onGridReady}
                                onConfirm={() => proccessDeleteItem()}
                            />}

        <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4 relative">
            <div style={{ position: 'relative' }}>
                {showIndicator && <AgGridIndicator />}
                <div className="ag-theme-alpine" style={{ height: 500 }}>
                    <AgGridReact 
                        ref={gridRef}
                        rowData={roles} 
                        animateRows={true} 
                        columnDefs={ROLE_COLUMNS_DEFS} 
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
  export default connect(mapStateToProps)(DisplayRoles)
