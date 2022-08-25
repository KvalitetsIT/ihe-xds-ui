import Button from "../feature/CredentialAPI/Button"
import Form from "../feature/CredentialAPI/Form"


// Sesssion Id in the future
const sessionID : String = "4afe2336-44c4-4509-8f85-f43f1a9d3b17"

export const HomePage = () => {
    return (
        <>
        <Form sessionID={sessionID}/>
        </>
    )
}