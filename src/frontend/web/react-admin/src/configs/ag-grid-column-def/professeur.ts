import { ColDef, ValueGetterParams } from "ag-grid-community";
import { Professeur } from "../../generated/models";
import { ImageCellRender } from "../../components/AgGridCells/ImageCelleRender";
import environment from "../../environments/environment";


export const PROFESSEUR_COLUMNS_DEFS: ColDef[] = [
  {
    headerName: '#',
    field: 'id',
    filter: 'agNumberColumnFilter', fouelefack@fouelefack - HP - Notebook: ~/Documents/Workspace / uv_projet_in3_2023$ git rebase - i
    Pas d'information de suivi distant pour la branche actuelle.
    Veuillez spécifier sur quelle branche vous souhaiter rebaser.
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
    field: 'last_name',
      filter: 'agTextColumnFilter',
        checkboxSelection: false,
          showDisabledCheckboxes: true, fouelefack@fouelefack-HP - Notebook: ~/Documents/Workspace / uv_projet_in3_2023$ git rebase - i
    Pas d'information de suivi distant pour la branche actuelle.
    Veuillez spécifier sur quelle branche vous souhaiter rebaser.
    width: 200
},
{
  headerName: 'prenom',
    field: 'first_name',
      filter: 'agTextColumnFilter',
        checkboxSelection: false,
          showDisabledCheckboxes: true,
            width: 200
},
{
  headerName: 'dateDeNaissance',
    field: 'date_de_naissance',
      filter: 'agTextColumnFilter',
        checkboxSelection: false,
          showDisabledCheckboxes: true,
            width: 200
},

{
  headerName: 'lieuDeNaissance',
    field: 'lieu_de_naissance',
      filter: 'agTextColumnFilter',
        checkboxSelection: false,
          showDisabledCheckboxes: true,
            width: 200
},
{
  headerName: 'Statut',
    field: 'redoublant',
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
{
  headerName: 'email',
    field: 'email',
      filter: 'agTextColumnFilter',
        checkboxSelection: false,
          showDisabledCheckboxes: true,
            width: 200
},
{
  headerName: 'telephone',
    field: 'telephone',
      filter: 'agTextColumnFilter',
        checkboxSelection: false,
          showDisabledCheckboxes: true,
            width: 200
},
{
  headerName: 'cour_id',
    field: 'cour_id',
      filter: 'agTextColumnFilter',
        checkboxSelection: false,
          showDisabledCheckboxes: true,
            width: 200
},
];
