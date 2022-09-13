import { useState } from "react"
import Form from "../../feature/CredentialAPI/Form/FormComponent"
import SearchResultTableComponent from "../../feature/CredentialAPI/Form/SearchResultTableComponent"


// Sesssion Id in the future
const sessionID: String = "4afe2336-44c4-4509-8f85-f43f1a9d3b17"

export const HomePage = () => {
    const [searchResult, setSearchResult] = useState("")

    const changeSearchResult = (value: string) => {
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