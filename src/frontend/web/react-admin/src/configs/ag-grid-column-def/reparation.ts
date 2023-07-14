import { ColDef } from "ag-grid-community";

export const REPARATION_COLUMNS_DEFS: ColDef[] = [
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
    headerName: 'Demarche de mediation',
    field: 'demarcheMediation',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 300,
  },  {
    headerName: 'Libellé de la Faute',
    field: 'faute.libelle',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 300,
  },  {
    headerName: 'Eleve',
    field: 'eleve',
    valueGetter: function(params) {
        var eleve = params.data.faute.eleve;
        return eleve.firstName + ' ' + eleve.lastName;
    },
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 300,
    }, {
    headerName: 'Status',
    field: 'status',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 300,
  },
 
];
