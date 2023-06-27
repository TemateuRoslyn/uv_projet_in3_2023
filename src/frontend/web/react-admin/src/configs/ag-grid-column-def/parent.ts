import { ColDef, ValueGetterParams } from "ag-grid-community";
import { Parents } from "../../generated/models";
import { ImageCellRender } from "../../components/AgGridCells/ImageCelleRender";
import environment from "../../environments/environment";


export const PARENT_COLUMNS_DEFS: ColDef[] = [
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
    headerName: 'Photo', 
    field: 'photo', 
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 100,
    cellRendererFramework: ImageCellRender,
    valueGetter: params => `${environment.basePath}/api/files/download?filekey=${params.data.photo}`
  },
  { 
    headerName: 'Prénom', 
    field: 'firstName',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 200
  },
  { 
    headerName: 'Nom', 
    field: 'lastName',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 200
  },
  { 
    headerName: 'Sexe', 
    field: 'sexe',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 100,
    // cellRenderer: (params: ValueGetterParams<Eleve>) => {
    //   return params.data?.classe?.name;
    // }
  },
];
