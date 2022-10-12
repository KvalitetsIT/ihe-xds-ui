import './DocumentStyle.css';

import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { base64Decode, urlDecoding } from "../../components/Utility/handleEncoding";
import { useGetDocumentsMutation } from "../../feature/CredentialAPI/redux/GetDocumentApi";
import { iti43Request } from "../../models/Searches/Iti43Request";
import { iti43Response } from "../../models/Searches/Iti43Response";
import { iti18RequestUnique } from '../../models/Searches/Iti18Request';
import { useUniqueIdSearchMutation } from '../../feature/CredentialAPI/redux/SearchApiSlice';
import { iti18ResponseUnique, registryError } from '../../models/Searches/Iti18Response';
import SearchErrorResponses from '../../feature/CredentialAPI/Form/SearchErrorResponse';

function Document() {
    let { id } = useParams();
    const [state, setState] = useState("")
    const [metaState, setMetaState] = useState({})
    const [flags, setFlags] = useState([false, false])


    const [getDocument] = useGetDocumentsMutation();
    const [getMetaData] = useUniqueIdSearchMutation();
    useEffect(() => {
        let request: iti43Request = makeRequest(id!)

        let metaDatRequest: iti18RequestUnique = {
            queryParameters: {
                credentialId: request.credentialId,
                patientId: request.queryParameters.patientId,
                documentId: request.queryParameters.documentId,
                context: request.context
            }
        }

        if (!flags[0]) {
            FetchMetaData(metaDatRequest, getMetaData).then((value) => {
                setMetaState(value)

                setFlags(oldArray =>  {
                    oldArray[0] = true
                    return oldArray 
                });

            })
        }
        if (!flags[1]) {
            FetchData(request, getDocument).then((value) => {
                setState(value)
                setFlags(oldArray =>  {
                    oldArray[1] = true
                    return oldArray 
                });
            })
        }
        // Need to have a proper fix

    }, [flags])

    
    if (state !== "" && flags[0] && flags[1]) {
        let errors: registryError[] = []
        try {
            errors = (metaState as iti18ResponseUnique).errors
        } catch {
            errors = (metaState as iti18ResponseUnique).errors
        }
        return (
            <>
                <SearchErrorResponses data={errors} amountOfResponses={errors.length} />
                <div className="form-container form-defualt">
                    <div className="form-panel-header" >Document</div>
                    <div className='form-body'>
                        <pre lang="xml">{<Typography>{state}</Typography>}</pre>
                    </div>

                </div>
            </>
        )
    }
    return null
}

export default Document

function makeRequest(stringInput: string) {

    let newString = base64Decode(urlDecoding(stringInput))



    let array = newString.split(',')



    let request: iti43Request = {
        queryParameters: {
            patientId: array[6],
            documentId: array[4],
            repositoryId: array[5]

        },
        credentialId: array[3],
        context: {
            authorizationCode: array[0],
            consentOverride: array[1] === 'true',
            role: array[2]
        }
    }

    return request

}

async function FetchMetaData(request: iti18RequestUnique, getMetaData: any) {
    let resp = await getMetaData(request)

    let temp = (resp.data as iti18ResponseUnique)

    return temp

}
async function FetchData(request: iti43Request, getDocument: any) {


    let resp: any = (await getDocument(request))


    let temp = (resp.data as iti43Response).response!



    return temp
}

function getMainBody(state: string) {

}

