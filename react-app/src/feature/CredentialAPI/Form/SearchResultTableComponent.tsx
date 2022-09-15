import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Iti18Response } from '../../../models/Searches/Iti18Response';

interface SearchResultTableProps {
    data: any


}

function SearchResultTableComponent(props: SearchResultTableProps) {

    if (props.data[0] != "") {


        const getRows = (data : any) => {
            

             
            const rows = []
            for (let i = 0; i < data.length; i++) {

                let resp = {
                    uniqueID: (data[i] as Iti18Response).documentId,
                    documentType: (data[i] as  Iti18Response).documentType,
                    patientId: (data[i] as Iti18Response).patientId,
                    repositoryID: (data[i]  as Iti18Response).repositoryID,
                    serviceStop: (data[i]  as Iti18Response).serviceEnd,
                    serviceStart: (data[i] as Iti18Response).serviceStart
                                }
                rows.push(resp)

            }

                return rows
        }

        let rowss = getRows(props.data)



        return (
            <>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rowss}
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

