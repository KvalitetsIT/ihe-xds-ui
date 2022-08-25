import { useState } from "react";
import CredentialInfo from "../../models/CredentialInfo";
import { useAddCredentielInfoMutation } from "./redux/CredentialInfoApiSlice";
import testObj  from "./TestObject";

function Button() {
    const [pressed, setPressed] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)

    const onFileChange = (e : any) =>{
            setSelectedFile(e.target.files[0])
    }


    const getStandard = () => {
        setPressed((prev) => !prev)

    }
    const addData = () => {
        const obj : CredentialInfo = testObj
       // useAddCredentielInfoMutation(obj)


    }


    if (pressed) {
        return (
            <div>
            <button onClick={getStandard}>Get</button>
            </div>
        )
    }
    return (
        <>
        <button onClick={getStandard}>Get</button>
        <div>
            <input type="file" onChange={onFileChange}/> 
        </div>
        </>
    )

}

export default Button