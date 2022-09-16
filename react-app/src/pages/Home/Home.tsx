import { useState } from "react"
import { getSession } from "../../components/Utility/sessionHandling"
import Form from "../../feature/CredentialAPI/Form/FormComponent"
import SearchResultTableComponent from "../../feature/CredentialAPI/Form/SearchResultTableComponent"


// Sesssion Id in the future - fix this in UploadCertificateForm.tsx too
const sessionID: String = getSession()

export const HomePage = () => {
    const [searchResult, setSearchResult] = useState([""])

    const changeSearchResult = (value : any) => {
        setSearchResult(value)
    }


    return (
        <div className="form-container form-defualt">
            <div className="form-panel-header" >Search for documents</div>
            <Form 
            sessionID={sessionID}
            changeSearchResult={changeSearchResult} />
            <>
                <SearchResultTableComponent
                    data={searchResult}
                />
            </>
        </div>
    )
}