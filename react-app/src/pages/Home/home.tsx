import Form from "../../feature/CredentialAPI/Form/FormComponent"


// Sesssion Id in the future
const sessionID : String = "4afe2336-44c4-4509-8f85-f43f1a9d3b17"

export const HomePage = () => {
    return (
        <div className="form-container form-defualt">
        <div className="form-panel-header">Search for documents</div>  
        <Form sessionID={sessionID}/>
                
        </div>
    )
}