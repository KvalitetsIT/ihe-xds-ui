import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Iti18Response } from '../../../models/Searches/Iti18Response';
import { formatTimeFromIti18Response } from '../../../components/Utility/formatTime';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

interface SearchResultTableProps {
    data: any
    closeResults : any


}

function SearchResultTableComponent(props: SearchResultTableProps) {

    if (props.data[0] !== "" ) {


        const getRows = (data: any) => {



            const rows = []
            for (let i = 0; i < data.length; i++) {

                let resp = {
                    uniqueID: (data[i] as Iti18Response).queryResponse.documentId,
                    documentType: (data[i] as Iti18Response).queryResponse.documentType,
                    patientId: (data[i] as Iti18Response).queryResponse.patientId,
                    repositoryID: (data[i] as Iti18Response).queryResponse.repositoryID,
                    serviceStop: formatTimeFromIti18Response((data[i] as Iti18Response).queryResponse.serviceEnd),
                    serviceStart: formatTimeFromIti18Response((data[i] as Iti18Response).queryResponse.serviceStart)
                }
                rows.push(resp)

            }

            return rows
        }

        let rowss = getRows(props.data)



        return (
            <>
                <div style={{ height: 400, width: '100%' }}>
                    <IconButton style={{ float: "right" }} onClick={() => {
                        props.closeResults([""])
                    }}>
                        <CloseIcon  />
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
    { field: 'documentType', headerName: 'Document Type', width: 460  },
    { field: 'serviceStart', headerName: 'Service Start', width: 200 },
    { field: 'serviceStop', headerName: 'Service Stop', width: 200 },
    { field: 'link', headerName: '', width: 130 },
    { field: 'empty1', headerName: '', width: 130 },
    { field: 'empty2', headerName: '', width: 130 },

];



