import { ColDef, ValueGetterParams } from "ag-grid-community";
import { Parents } from "../../generated/models";
import { ImageCellRender } from "../../components/AgGridCells/ImageCelleRender";
import environment from "../../environments/environment";
import ListCellRendererParent from "../../components/AgGridCells/ListCellRendererParent";


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
    headerName: 'Username', 
    field: 'user.username',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 200,
    cellRenderer: (params: ValueGetterParams<Parents>) => {
      return params.data?.user?.username ? params.data?.user?.username: null;
    }
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
  {
    headerName: 'Eleves',
    field: 'eleves',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 300,
    cellRendererFramework: ListCellRendererParent,
  }, 
  { 
    headerName: 'Téléphone', 
    field: 'telephone',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 200
  },
  { 
    headerName: 'Email', 
    field: 'user.email',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 200,
    cellRenderer: (params: ValueGetterParams<Parents>) => {
      return params.data?.user?.email ? params.data?.user?.email: null;
    }
  },
  { 
    headerName: 'Profession', 
    field: 'profession',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 200
  },
];
