import { Box, Button, Modal, Typography } from "@mui/material"
import { useState } from "react"
import { iti43Request } from "../../../models/Searches/Iti43Request"
import { iti43Response } from "../../../models/Searches/Iti43Response"
import { useGetDocumentsMutation } from "../redux/GetDocumentApi"

interface DocumentLinkComponent {
    owner : string
    documentId : string 
    repository : string
    searchRequest : any

}

export function DocumentLinkComponent(props : DocumentLinkComponent) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState("")
    const [getDocument, documentResult] = useGetDocumentsMutation();

    const handleOpen = async () => {
        let request : iti43Request = {
            queryParameters: {
                patientId : props.searchRequest.iti18QueryParameter.patientId
                , documentId : props.documentId, repositoryId : props.repository

            },
            credentialId: props.owner,
            context: props.searchRequest.context
        }

        console.log(request)
        //console.log(await getDocument(request))

        //setData(()
        //setOpen(true)
        
    };
    const handleClose = () => setOpen(false);
    
    return (
        <>
        <Button onClick={handleOpen}>test {props.owner}</Button>
        <Modal
          open={open}
          onClose={handleClose}

        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
        </>
    )
}


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  