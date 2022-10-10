import {  Button } from "@mui/material"

import { base64Encode, urlEncoding } from "../../../components/Utility/handleEncoding"
import { iti18Request } from "../../../models/Searches/Iti18Request"
import { iti43Request } from "../../../models/Searches/Iti43Request"


interface DocumentLinkComponent {
  documentId: string
  repository: string
  searchRequest: any

}

export function DocumentLinkComponent(props: DocumentLinkComponent) {

  const openInNewTab = (url :string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  

  const handleOnClick = async () => {
    let request: iti43Request = {
      queryParameters: {
        patientId: (props.searchRequest as iti18Request).queryParameters.patientId!,
        documentId: props.documentId,
        repositoryId: props.repository

      },
      credentialId: (props.searchRequest as iti18Request).credentialId,
      context: (props.searchRequest as iti18Request).context
    }

    let path : string = "http://localhost:3000/document/"

    path = path + urlEncoding(base64Encode(makeString(request)))


    openInNewTab(path)


  };


  return (
    <>
      <Button onClick={handleOnClick}>Show</Button>
    </>
  )
}




const makeString = (request: iti43Request) => {

  let temp : string =  request.context.authorizationCode + "," + request.context.consentOverride + "," + request.context.role 
  + "," + request.credentialId + "," + request.queryParameters.documentId + "," + request.queryParameters.repositoryId +"," + 
  request.queryParameters.patientId 

  return temp


}