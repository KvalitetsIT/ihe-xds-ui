import { useGetIDsforOwnerQuery } from "./redux/CredentialInfoApiSlice"
import Loading from "../../components/loading"
import { useState } from "react";
import { useNavigate } from "react-router-dom";



function Form(props : any) {
    const {data , isLoading, isSuccess, isError, error} = useGetIDsforOwnerQuery(props.sessionID)
    const navigate = useNavigate()
    
    /*const [owners, setOwners] = useState([]);
    
    const updateOwnsers = () => {

        for (let obj of data) {
            let temp = {value : obj, label : obj}
            setOwners((prev) => ({...prev, temp}))
        }
        
    }*/


    if (isLoading) {
        return Loading()
    }
    else if (isSuccess) {
        return (
            <>
            <select>
                {data!.map((item : any, index : number) => {
                    return (
                        <option key={index} value={"" + item.id}>{item.id}</option>
                    )
                })}

            </select>
            <a onClick={() => navigate("/upload-certifacte")}>Upload own certificate</a>
            </>        
        )
    }
    return null



}

export default Form