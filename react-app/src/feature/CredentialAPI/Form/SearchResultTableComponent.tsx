import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Iti18QueryResponse, Iti18Response } from '../../../models/Searches/Iti18Response';
import { formatTimeFromIti18Response } from '../../../components/Utility/formatTime';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { instanceOfIti18Response } from '../../../components/Utility/instanceOfObject';
import SearchErrorResponses from './SearchErrorResponse';

interface SearchResultTableProps {
    //data: any
    data: any
    closeResults: any


}

function SearchResultTableComponent(props: SearchResultTableProps) {

    if (instanceOfIti18Response(props.data)) {
        const getRows = (data: any) => {
            const rows: any = []
            for (let i = 0; i < ((props.data as Iti18Response).queryResponse).length; i++) {

                let resp = {
                    uniqueID: (data as Iti18Response).queryResponse[i].documentId,
                    documentType: (data as Iti18Response).queryResponse[i].documentType,
                    patientId: (data as Iti18Response).queryResponse[i].patientId,
                    repositoryID: (data as Iti18Response).queryResponse[i].repositoryID,
                    serviceStop: formatTimeFromIti18Response((data as Iti18Response).queryResponse[i].serviceEnd),
                    serviceStart: formatTimeFromIti18Response((data as Iti18Response).queryResponse[i].serviceStart)
                }
                rows.push(resp)

            }

            return rows
        }

        let rowss = getRows(props.data)
        return (
            <>
                <SearchErrorResponses data={(props.data as Iti18Response).errors}
                 amountOfResponses={(props.data as Iti18Response).queryResponse.length} />
                <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
                    <IconButton style={{ float: "right" }} onClick={() => {
                        props.closeResults([""])
                    }}>
                        <CloseIcon />
                    </IconButton>

                    <DataGrid
                        rows={rowss}
                        columns={columns}
                        pageSize={100}
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
    { field: 'uniqueID', headerName: 'Unique ID', width: 300 },
    { field: 'repositoryID', headerName: 'Repository ID', width: 200 },
    { field: 'documentType', headerName: 'Document Type', width: 460 },
    { field: 'serviceStart', headerName: 'Service Start', width: 200 },
    { field: 'serviceStop', headerName: 'Service Stop', width: 200 },
    { field: 'link', headerName: '', width: 130 },
    { field: 'empty1', headerName: '', width: 130 },
    { field: 'empty2', headerName: '', width: 130 },

];



