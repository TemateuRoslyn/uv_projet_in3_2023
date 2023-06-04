import { ColDef, ValueGetterParams } from "ag-grid-community";
import { Classe } from "../../generated/models";

export const ClASSE_COLUMNS_DEFS: ColDef[] = [
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
    width: 200
  },
  { 
    headerName: 'Petit Nom', 
    field: 'shortName',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 300
  },
  { 
    headerName: 'Spécialité', 
    field: 'speciality',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 200
  },
  {
    headerName: 'Salle',
    field: 'speciality',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 200,
    cellRenderer: (params: ValueGetterParams<Classe>) => {
      let finalValue: string = '';
      if(params.data?.speciality !== null && params.data?.speciality != undefined){
        finalValue = params.data?.shortName + ' ' + params.data?.speciality + ' ' + params.data?.no
      }else {
        finalValue = params.data?.shortName  + ' ' + params.data?.no
      }
      return finalValue;
    }
  },
  { 
    headerName: 'Effectif', 
    field: 'effectif',
    filter: 'agNumberColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 200
  },

];
