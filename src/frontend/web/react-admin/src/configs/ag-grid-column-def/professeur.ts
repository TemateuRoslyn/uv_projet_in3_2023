import { ColDef, ValueGetterParams } from "ag-grid-community";
import { ImageCellRender } from "../../components/AgGridCells/ImageCelleRender";
import environment from "../../environments/environment";


export const PROFESSEUR_COLUMNS_DEFS: ColDef[] = [
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
  headerName: 'nom',
    field: 'lastName',
      filter: 'agTextColumnFilter',
        checkboxSelection: false,
          showDisabledCheckboxes: true, 
    width: 200
},
{
  headerName: 'prenom',
    field: 'firstName',
      filter: 'agTextColumnFilter',
        checkboxSelection: false,
          showDisabledCheckboxes: true,
            width: 200
},
{
  headerName: 'Date de Naissance',
    field: 'dateDeNaissance',
      filter: 'agTextColumnFilter',
        checkboxSelection: false,
          showDisabledCheckboxes: true,
            width: 160
},

// {
//   headerName: 'lieuDeNaissance',
//     field: 'lieuDeNaissance',
//       filter: 'agTextColumnFilter',
//         checkboxSelection: false,
//           showDisabledCheckboxes: true,
//             width: 200
// },
{
  headerName: 'Statut',
    field: 'statut',
      filter: 'agTextColumnFilter',
        checkboxSelection: false,
          showDisabledCheckboxes: true,
            width: 120,

  },
{
  headerName: 'Sexe',
    field: 'sexe',
      filter: 'agTextColumnFilter',
        checkboxSelection: false,
          showDisabledCheckboxes: true,
            width: 100,
    // cellRenderer: (params: ValueGetterParams<Professeur>) => {
    //   return params.data?.classe?.name;
    // }
  },
// {
//   headerName: 'email',
//     field: 'user.email',
//       filter: 'agTextColumnFilter',
//         checkboxSelection: false,
//           showDisabledCheckboxes: true,
//             width: 200
// },
{
  headerName: 'telephone',
    field: 'telephone',
      filter: 'agTextColumnFilter',
        checkboxSelection: false,
          showDisabledCheckboxes: true,
            width: 200
},
{
  headerName: 'CourLibelle',
    field: 'cour.libelle',
      filter: 'agTextColumnFilter',
        checkboxSelection: false,
          showDisabledCheckboxes: true,
            width: 120
},
];
