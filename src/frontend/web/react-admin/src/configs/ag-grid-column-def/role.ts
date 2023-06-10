import { ColDef } from "ag-grid-community";
import StatusRoleBtn from "../../pages/Admin/Role/components/StatusRoleBtn";

export const ROLE_COLUMNS_DEFS: ColDef[] = [
    { 
        headerName: '#', 
        field: 'id',
        filter: 'agNumberColumnFilter',
        headerCheckboxSelection: true, 
        checkboxSelection: true,
        showDisabledCheckboxes: true,
        width: 100
      },
      { 
        headerName: 'Nom', 
        field: 'name',
        filter: 'agTextColumnFilter',
        checkboxSelection: false,
        showDisabledCheckboxes: true,
        width: 300
      },
      { 
        headerName: 'Description', 
        field: 'description',
        filter: 'agTextColumnFilter',
        checkboxSelection: false,
        showDisabledCheckboxes: true,
        width: 700
      },
      {
        headerName: 'Status',
        field: 'status',
        editable: false,
        cellRendererFramework: StatusRoleBtn,
        width: 300
      }
];
