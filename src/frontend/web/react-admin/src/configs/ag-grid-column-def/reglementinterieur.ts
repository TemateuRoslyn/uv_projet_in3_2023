// import StatusCoursBtn from "../../pages/Admin/Cours/components/StatusPermissionBtn" // Replace "path/to" with the actual path to the StatusCoursBtn component
import { ReglementInterieur } from "../../generated/models";
import { ColDef, ValueGetterParams } from "ag-grid-community";


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
    field: 'Libelle',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 300,
    cellRenderer: (params: ValueGetterParams<ReglementInterieur>) => {
      return params.data?.libelle;
    }
  },
];
