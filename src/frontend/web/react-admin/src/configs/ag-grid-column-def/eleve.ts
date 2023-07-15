import { ColDef, ValueGetterParams } from "ag-grid-community";
import { Eleve } from "../../generated/models";
import { ImageCellRender } from "../../components/AgGridCells/ImageCelleRender";
import environment from "../../environments/environment";


export const ELEVE_COLUMNS_DEFS: ColDef[] = [
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
    headerName: 'Status',
    field: 'redoublant',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 120,
    cellRenderer: (params: ValueGetterParams<Eleve>) => {
      let redoublant: string = '';
      if (params.data?.redoublant === false) {
        if (params.data?.sexe === 'Masculin')
          redoublant = "Redoublant"
        else
          redoublant = "Redoublante"
      } else {
        if (params.data?.sexe == 'Masculin')
          redoublant = "Nouveau"
        else
          redoublant = "Nouvelle"
      }
      return redoublant;
    }
  },
  {
    headerName: 'Frais scolaire',
    field: 'solvable',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 150,
    cellRenderer: (params: ValueGetterParams<Eleve>) => {
      let solvalble: string = '';
      if (params.data?.solvable === true) {
        solvalble = "Payée"
      } else {
        solvalble = "Impayée"
      }
      return solvalble;
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
    headerName: 'Salle',
    field: 'classe.name',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 130,
    cellRenderer: (params: ValueGetterParams<Eleve>) => {
      let salle: string = '';
      if (params.data?.classe?.speciality !== null && params.data?.classe?.speciality != undefined) {
        salle = params.data?.classe?.shortName + ' ' + params.data?.classe?.speciality + ' ' + params.data?.classe?.no
      } else {
        salle = params.data?.classe?.shortName + ' ' + params.data?.classe?.no
      }
      return salle;
    }
  },
  {
    headerName: 'Série',
    field: 'classe.name',
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    showDisabledCheckboxes: true,
    width: 50,
    cellRenderer: (params: ValueGetterParams<Eleve>) => {
      return params.data?.classe?.speciality ? params.data?.classe?.speciality : null;
    }
  },


];
