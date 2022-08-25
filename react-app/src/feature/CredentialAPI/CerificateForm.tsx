import Loading from "../../components/loading"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CredentialInfo from "../../models/CredentialInfo";
import testObj from "./TestObject";
import { useAddCredentielInfoMutation } from "./redux/CredentialInfoApiSlice";



function CertificateForm() {
    const navigate = useNavigate()
    const [addCredentielInfo] = useAddCredentielInfoMutation()

    const uploadCertificate = () => {
        const obj : CredentialInfo = testObj
        addCredentielInfo(obj)
        console.log("Post sent")
        navigate(-1);
    }


    return (
        <>
        <h1>HI</h1>
        <button onClick={uploadCertificate}></button>
        <a onClick={() => navigate(-1)}>BACK</a>
    </>
    )
    



}

export default CertificateForm