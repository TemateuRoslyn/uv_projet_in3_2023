import { ColDef } from "ag-grid-community";
import { StatusUserBtnComponent } from "../../views/admin/user/components/status-user-btn/status-user-btn.component";

export const USER_COLUMNS_DEFS: ColDef[] = [
    {
      headerName: "",
      valueGetter: (params) => {
        return params.node.rowIndex + 1;
      },
      width: 60,
      type: "nonEditableColumn",
      filter: false,
    },
    {
      headerName: "",
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      floatingFilter: false,
      width: 60,
      type: "nonEditableColumn",
    },
    {
      headerName: "Login",
      field: "username",
      width: 350,
      type: "nonEditableColumn",
    },
    {
      headerName: "Email",
      field: "userEmail",
      width: 450,
      type: "nonEditableColumn",
    },
    {
      headerName: "Statut",
      field: "statut",
      width: 300,
      cellRendererFramework: StatusUserBtnComponent,
      type: "nonEditableColumn",
    },
  ];
  
  export const USER_CSV_COLUMNS_DEFS: ColDef[] = [
    {
      headerName: "Login",
      field: "username",
      width: 350,
      type: "nonEditableColumn",
    },
    {
      headerName: "Email",
      field: "userEmail",
      width: 450,
      type: "nonEditableColumn",
    },
  ];
  
  