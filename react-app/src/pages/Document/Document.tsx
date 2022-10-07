import './DocumentStyle.css';

import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { base64Decode, urlDecoding } from "../../components/Utility/handleEncoding";
import { useGetDocumentsMutation } from "../../feature/CredentialAPI/redux/GetDocumentApi";
import { iti43Request } from "../../models/Searches/Iti43Request";
import { iti43Response } from "../../models/Searches/Iti43Response";

  function Document() {
    let { id } = useParams();
    const [state, setState] = useState("")


    const [getDocument, documentResult] = useGetDocumentsMutation();
    useEffect( () => {
        let request : iti43Request = makeRequest(id!)
        
        FetchData(request, getDocument).then((value) => {
            setState(value)
        })
    }, [])

    if (state !== "") {
        return (
            <>
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



async function FetchData(request: iti43Request, getDocument : any) {


  let resp: any = (await getDocument(request))
  console.log(resp)


  let temp = (resp.data as iti43Response).response!

  

  return temp
}


