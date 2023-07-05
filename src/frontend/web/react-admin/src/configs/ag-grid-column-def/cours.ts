import { ColDef } from "ag-grid-community";
import ListCellRenderer from "../../components/AgGridCells/ListCellRenderer";

export const COURS_COLUMNS_DEFS: ColDef[] = [
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
  {
    headerName: 'Professeur',
    field: 'professeur.firstName',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 300,
  },
  {
    headerName: 'Classes',
    field: 'classes',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 300,
    cellRendererFramework: ListCellRenderer,
  },  

  {
    headerName: 'Date du Cours',
    field: 'date_cour',
    filter: 'agDateColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 300,
  },
  {
    headerName: 'Heure de Début',
    field: 'heure_debut',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 300,
  },
  {
    headerName: 'Heure de Fin',
    field: 'heure_fin',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 300,
  },
 
];
