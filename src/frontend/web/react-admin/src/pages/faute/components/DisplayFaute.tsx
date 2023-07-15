import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import * as XLSX from 'xlsx';
import { connect, useSelector } from 'react-redux';

import { FAUTES_COLUMNS_DEFS } from '../../../configs/ag-grid-column-def/faute';
import { Faute } from '../../../generated/models';
import { ReduxProps } from '../../../redux/configureStore';
import { Link } from 'react-router-dom';
import CreateOrUpdateFauteModal from './CreateOrUpdateFauteModal';
import { MODAL_MODE } from '../../../constants/ENUM';

import {
  EditIcon,
  ExcelIcon,
  EyeIcon,
  NewIcon,
  RefreshIcon,
  TrashIcon,
} from '../../../components/Icone';

import './DisplayFaute.css';
import { AgGridIndicator } from '../../../components/AgGridIndicator';
import { FautesApi } from '../../../generated';
import { TOKEN_LOCAL_STORAGE_KEY } from '../../../constants/LOCAL_STORAGE';
import { DeleteItemModal } from '../../../components/DeleteItemModal';
import { TOKEN_EXPIRED } from '../../../constants/RESPONSES_CODE';

interface DisplayFauteProps {
  faute: Faute[];
  isLoading: boolean;

  setShowSuccessNotif: (value: boolean) => void;
  setSuccessNotifMessage: (value: string) => void;
  setSuccessNotifDescription: (value: string | null) => void;

  setShowWarning: (value: boolean) => void;
  setWarningMessage: (value: string) => void;
  setWarningNotifDescription: (value: string | null) => void;

  setShowDangerNotif: (value: boolean) => void;
  setDangerNotifMessage: (value: string) => void;
  setDangerNotifDescription: (value: string | null) => void;

  setTokenExpired: () => void;
}

const DisplayFaute: React.FC<DisplayFauteProps> = (props) => {
  const state = useSelector((state: ReduxProps) => state);
  const [faute, setFaute] = useState<Faute[]>(props.faute);
  const [fauteItem, setFauteItem] = useState<Faute>(props?.faute[0]);

  const [showCreateOrUpdateModal, setShowCreateOrUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [modalMode, setModalMode] = useState<MODAL_MODE>(MODAL_MODE.create);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [showIndicator, setShowIndicator] = useState<boolean>(false);

  const gridRef = useRef<any>(null);

  const onGridReady = useCallback(() => {
    const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    const fautesApi = new FautesApi({
      ...state.environment,
      accessToken: token,
    });

    setShowIndicator(true);

    fautesApi
      .indexFautes('Bearer ' + token)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            setFaute(response.data.content);
          }
        }
      })
      .catch((error) => {
        if (
          error?.response?.status === TOKEN_EXPIRED.status &&
          error?.response?.data?.message === TOKEN_EXPIRED.data.message
        ) {
          props.setTokenExpired();
        } else {
          alert(error?.response?.data?.message);
        }
      })
      .finally(() => {
        setShowIndicator(false);
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
    setModalMode(MODAL_MODE.create);
    setModalTitle('Créer une nouvelle faute');
  };

  const handleExportExcel = () => {
    if (gridRef.current && gridRef.current.api) {
      const rowData = gridRef.current.api.getSelectedRows();
      if (rowData && rowData.length > 0) {
        const worksheet = XLSX.utils.json_to_sheet(rowData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Faute');
        XLSX.writeFile(workbook, 'faute_data.xlsx');
      } else {
        alert('Veuillez sélectionner une ligne !');
      }
    }
  };

  const handleUpdateItem = () => {
    if (gridRef.current && gridRef.current.api) {
      const rowData = gridRef.current.api.getSelectedRows();
      if (rowData && rowData.length === 1) {
        setFauteItem(rowData[0]);
        setShowCreateOrUpdateModal(true);
        setModalMode(MODAL_MODE.update);
        setModalTitle('Modifier une faute');
      } else if (rowData && rowData.length > 1) {
        alert('Vous devez sélectionner une seule ligne à supprimer !');
      } else {
        alert('Veuillez sélectionner la ligne à modifier !');
      }
    }
  };

  const handleViewItem = () => {
    if (gridRef.current && gridRef.current.api) {
      const rowData = gridRef.current.api.getSelectedRows();
      if (rowData && rowData.length === 1) {
        setFauteItem(rowData[0]);
        setShowCreateOrUpdateModal(true);
        setModalMode(MODAL_MODE.view);
        setModalTitle("Détail d'une faute");
      } else if (rowData && rowData.length > 1) {
        alert(
          'Vous devez sélectionner une seule ligne pour voir les détails !'
        );
      } else {
        alert('Veuillez sélectionner la ligne à observer !');
      }
    }
  };

  const handleDeleteItem = () => {
    if (gridRef.current && gridRef.current.api) {
      const rowData = gridRef.current.api.getSelectedRows();
      if (rowData && rowData.length === 1) {
        setFauteItem(rowData[0]);
        setShowDeleteModal(true);
      } else if (rowData && rowData.length > 1) {
        alert('Vous devez sélectionner une seule ligne à supprimer !');
      } else {
        alert('Veuillez sélectionner la ligne à supprimer !');
      }
    }
  };

  const processDeleteItem = () => {
    const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    const coursApi = new FautesApi({
      ...state.environment,
      accessToken: token,
    });

    setShowIndicator(true);

    coursApi
      .deleteMistake('Bearer ' + token, fauteItem.id)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            setShowDeleteModal(false);
            onGridReady();

            // notification
            props.setDangerNotifMessage(response.data.message);
            props.setDangerNotifDescription(
              'Cette faute a été supprimé avec succès'
            );
            props.setShowDangerNotif(true);
          }
        }
      })
      .catch((error) => {
        alert(error?.response?.data?.message);
      })
      .finally(() => {
        setShowIndicator(false);

        // notification
        setTimeout(() => {
          props.setShowDangerNotif(false);
        }, 3000);
      });
  };

  const shared_class: string =
    'rounded-md inline-flex items-center justify-center gap-2.5 py-2 sm:py-2  px-1 text-center font-medium text-white hover:bg-opacity-90 sm:px-2 md:px-3 lg:px-3 xl:px-3';

  return (
    <div>
      <div className="mb-3.5 flex flex-wrap justify-end gap-1 xl:gap-3">
        <Link
          onClick={handleNewItem}
          to="#"
          className={`${shared_class}`}
          style={{ backgroundColor: '#057a4f' }}
        >
          <NewIcon size={2} color="#fff" />
          Nouveau
        </Link>
      </div>
      <div className="mb-3.5 flex flex-wrap gap-1 xl:gap-3">
        <Link
          onClick={handleExportExcel}
          to="#"
          className={`bg-success ${shared_class}`}
        >
          <ExcelIcon size={18} color="#fff" />
          Export en Excel
        </Link>

        <Link
          onClick={onGridReady}
          to="#"
          className={`bg-secondary ${shared_class}`}
        >
          <RefreshIcon size={18} color="#fff" />
          Rafraîchir
        </Link>

        <Link
          to="#"
          onClick={handleViewItem}
          className={`bg-success ${shared_class}`}
        >
          <EyeIcon size={18} color="#fff" />
          Voir
        </Link>

        <Link
          to="#"
          onClick={handleUpdateItem}
          className={`bg-primary ${shared_class}`}
        >
          <EditIcon size={18} color="#fff" />
          Modifier
        </Link>

        <Link
          to="#"
          onClick={handleDeleteItem}
          className={`bg-danger ${shared_class}`}
        >
          <TrashIcon size={18} color="#fff" />
          Supprimer
        </Link>
      </div>

      {showCreateOrUpdateModal && (
        <CreateOrUpdateFauteModal
          mode={modalMode}
          title={modalTitle}
          onClose={() => setShowCreateOrUpdateModal(false)}
          refresh={onGridReady}
          item={modalMode !== MODAL_MODE.create ? fauteItem : null}
          setShowSuccessNotif={props.setShowSuccessNotif}
          setSuccessNotifMessage={props.setSuccessNotifMessage}
          setSuccessNotifDescription={props.setSuccessNotifDescription}
          setShowWarning={props.setShowWarning}
          setWarningMessage={props.setWarningMessage}
          setWarningNotifDescription={props.setWarningNotifDescription}
        />
      )}

      {showDeleteModal && (
        <DeleteItemModal
          itemName={fauteItem.name}
          onClose={() => setShowDeleteModal(false)}
          refresh={onGridReady}
          onConfirm={() => processDeleteItem()}
        />
      )}

      <div className="relative col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4 ">
        <div style={{ position: 'relative' }}>
          {showIndicator && <AgGridIndicator />}
          <div className="ag-theme-alpine" style={{ height: 500 }}>
            <AgGridReact
              rowData={faute}
              columnDefs={FAUTES_COLUMNS_DEFS}
              ref={gridRef}
              animateRows={true}
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
export default connect(mapStateToProps)(DisplayFaute);
