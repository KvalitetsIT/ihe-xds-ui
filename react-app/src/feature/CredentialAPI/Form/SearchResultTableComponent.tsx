import { Rtt } from "@mui/icons-material";
import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

interface SearchResultTableProps {
    data: any

}

function SearchResultTableComponent(props: SearchResultTableProps) {


    if (props.data != "") {

        return (
            <>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[25]}
                        getRowId={(row) => row.uniqueID}
                    />
                </div>
            </>
        )
    }
    else {
        return null
    }





}

export default SearchResultTableComponent;





const columns: GridColDef[] = [
    { field: 'uniqueID', headerName: 'Unique ID', width: 130 },
    { field: 'repositoryID', headerName: 'Repository ID', width: 130 },
    { field: 'documentType', headerName: 'Document Type', width: 130 },
    { field: 'serviceStart', headerName: 'Service Start', width: 130 },
    { field: 'serviceStop', headerName: 'Service Stop', width: 130 },
    { field: 'link', headerName: '', width: 130 },
    { field: 'empty1', headerName: '', width: 130 },
    { field: 'empty2', headerName: '', width: 130 },

];

const rows = [
    { uniqueID: 1, repositoryID: '1.2.1.2.3', documentType: 'Dato og tidspunkt for møde mellem patient og sundhedsperson', serviceStart: 35, serviceStop: null, link: null, empyty1: null, empty2: null }

];

function getRows() {
    // Gets gets generated
} 
