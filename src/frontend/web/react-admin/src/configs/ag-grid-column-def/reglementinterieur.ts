import { ColDef } from "ag-grid-community";
import StatusCoursBtn from "../../pages/Admin/Cours/components/StatusPermissionBtn" // Replace "path/to" with the actual path to the StatusCoursBtn component

export const REGLEMENTINTERIEUR_COLUMNS_DEFS: ColDef[] = [
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
    headerName: 'Libellé',
    field: 'libelle',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 300,
  },
 
];
