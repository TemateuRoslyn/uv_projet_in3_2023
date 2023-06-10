import { ColDef } from "ag-grid-community";
import { StatusRoleBtnComponent } from "../../views/admin/roles/status-role-btn/status-role-btn.component";

export const ROLE_COLUMNS_DEFS: ColDef[] = [
    {
        headerName: '',
        valueGetter: (params) => {
            return params.node.rowIndex + 1;
        },
        width: 60,
        type: 'nonEditableColumn',
        filter: false
    },
    {
        headerName: '',
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        floatingFilter: false,
        width: 60,
        type: 'nonEditableColumn'
    },
    {
        headerName: 'Nom',
        field: 'roleName',
        width: 350,
        type: 'nonEditableColumn'
    },
    {
        headerName: 'Description',
        field: 'roleDesc',
        width: 450,
        type: 'nonEditableColumn',
    },
    {
        headerName: 'Statut',
        field: 'statut',
        width: 300,
        cellRendererFramework: StatusRoleBtnComponent,
        type: 'nonEditableColumn'
    }
];
