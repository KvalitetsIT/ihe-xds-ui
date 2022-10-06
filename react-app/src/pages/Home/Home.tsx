import { useState } from "react"
import { getSession } from "../../components/Utility/sessionHandling"
import Form from "../../feature/CredentialAPI/Form/FormComponent"
import SearchResultTableComponent from "../../feature/CredentialAPI/Form/SearchResultTableComponent"
import { iti18Request } from "../../models/Searches/Iti18Request"


// Sesssion Id in the future - fix this in UploadCertificateForm.tsx too


export const HomePage = (props: any) => {
    const [searchResult, setSearchResult] = useState([""])
    const [searchRequest, setSearchRequest] = useState({})
    const sessionID: string = props.session

    const changeSearchResult = (value: any) => {
        setSearchResult(value)
    }

    const changeSearchRequest = (value : iti18Request) => {
        setSearchRequest(value)
    }

    return (
        <>
            <div className="form-container form-defualt">
                <div className="form-panel-header" >Search for documents</div>
                <Form
                    sessionID={sessionID}
                    changeSearchResult={changeSearchResult}
                    changeSearchRequest={changeSearchRequest}
                     />

            </div>
            <div className="result form-container form-defualt">
                <SearchResultTableComponent
                    data={searchResult} closeResults={changeSearchResult} sessionID={sessionID} searchRequest={searchRequest}/>
            </div>
        </>
    )
}

