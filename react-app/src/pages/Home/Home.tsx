import { useState } from "react"
import { getSession } from "../../components/Utility/sessionHandling"
import Form from "../../feature/CredentialAPI/Form/FormComponent"
import SearchResultTableComponent from "../../feature/CredentialAPI/Form/SearchResultTableComponent"


// Sesssion Id in the future - fix this in UploadCertificateForm.tsx too


export const HomePage = (props : any) => {
    const [searchResult, setSearchResult] = useState([""])
    const sessionID: String = props.session

    const changeSearchResult = (value: any) => {
        setSearchResult(value)
    }


    return (
        <>
            <div className="form-container form-defualt">
                <div className="form-panel-header" >Search for documents</div>
                <Form
                    sessionID={sessionID}
                    changeSearchResult={changeSearchResult} />

            </div>
            <div className="result form-container form-defualt">
            <SearchResultTableComponent
                    data={searchResult} closeResults={changeSearchResult}                />
            </div>
        </>
    )
}

