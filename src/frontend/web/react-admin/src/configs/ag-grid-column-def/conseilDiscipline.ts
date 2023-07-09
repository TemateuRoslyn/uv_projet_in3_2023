import { ColDef } from "ag-grid-community";

export const CONSEILDISCIPLINE_COLUMNS_DEFS: ColDef[] = [
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
    headerName: 'Libellé Fautes',
    field: 'faute.libelle',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 300,
  },
  {
    headerName: 'Date Du Conseil',
    field: 'dateCd',
    filter: 'agDateColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 300,
  },
  {
    headerName: 'Eleve',
    field: 'eleve',
    valueGetter: function(params) {
        var eleve = params.data.eleve;
        return eleve.firstName + ' ' + eleve.lastName;
    },
    filter: 'agNumberColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 300,
  },
  {
    headerName: 'Classe',
    field: 'eleve.classe',
    valueGetter: function (params) {
    var classe = params.data.eleve.classe;
    var classeName = classe.name;
    
    if (classe.speciality) {
      classeName += ' ' + classe.speciality;
    }
    
    classeName += ' ' + classe.no;
    
    return classeName;
  },
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 300,
  },
  {
    headerName: 'Regle',
    field: 'faute.regle.libelle',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 300,
  },
  {
    headerName: 'Heure de Debut',
    field: 'heureDebutCd',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 300,
  },
  {
    headerName: 'Heure de Fin',
    field: 'heureFinCd',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 300,
  },
  {
    headerName: 'Status',
    field: 'status',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 300,
  },
];
