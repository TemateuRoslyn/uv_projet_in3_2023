import { ColDef, ValueGetterParams } from "ag-grid-community";
import { Faute } from "../../generated/models";
import { ImageCellRender } from "../../components/AgGridCells/ImageCelleRender";
import environment from "../../environments/environment";


export const FAUTES_COLUMNS_DEFS: ColDef[] = [
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
        headerName: 'Libelle',
        field: 'libelle',
        filter: 'agTextColumnFilter',
        checkboxSelection: false,
        showDisabledCheckboxes: true,
        width: 200
    },
    {
        headerName: 'Gravite',
        field: 'gravite',
        filter: 'agTextColumnFilter',
        checkboxSelection: false,
        showDisabledCheckboxes: true,
        width: 200
    },

];
