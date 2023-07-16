import { ColDef } from "ag-grid-community";
// import StatusCoursBtn from "../../pages/Admin/Cours/components/StatusPermissionBtn" // Replace "path/to" with the actual path to the StatusCoursBtn component

export const SUGGESTION_COLUMNS_DEFS: ColDef[] = [
  {
    headerName: '#',
    field: 'id',
    filter: 'agNumberColumnFilter',
    headerCheckboxSelection: true,
    checkboxSelection: true,
    showDisabledCheckboxes: true,
    width: 100,
  },
  {
    headerName: 'description',
    field: 'description',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 700,
  },
 
];
