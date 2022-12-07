import '../Preview/uploadStyle.css';

import { Button, Input, TextField, Typography } from "@mui/material"
import { Form, Formik, FormikHelpers, FormikValues, getIn } from "formik"
import { useState } from "react"
import DropdownCredentialInfo from "../../../components/DropdownCredentialInfo"
import Dropdown from "../../../components/Generics/Dropdown"
import { getSession } from "../../../components/Utility/sessionHandling"
import { handleUpload } from "../../../components/Utility/uploadFileHandler"
import { useGetIDsForOwnerQuery } from "../../../feature/CredentialAPI/redux/CredentialInfoApiSlice"
import { useGetRepositoriesQuery, usePostPreUploadMutation, usePostUploadMutation } from "../../../feature/CredentialAPI/redux/iti41preUploadApi"
import { Codes, CredentialInfoResponse, credentialType } from "../../../models/Searches/Search"
import { generatedMetadata, iti41PreUploadRequest } from "../../../models/UploadModels/PreUploadRequest"
import { iti41Repository } from "../../../models/UploadModels/Repository"
import { RenderPreviewXML } from "./XMLPreview"
import { RenderGeneratedMetaData } from './GeneratedMetaData';
import { UploadPreviewWrapper } from './Wrapper';
import { useGetHealthCareFacilityTypeCodeQuery } from '../../../feature/CredentialAPI/redux/CodesApSlicei';
import { formatTimeFromIti18Response } from '../../../components/Utility/formatTime';
import { iti41UploadRequest, iti41UploadResponse, responseMetaData } from '../../../models/UploadModels/UploadModels';





//props: any
export const UploadPreview = (props: any) => {
    const [postForm] = usePostUploadMutation();
        const [fileName, setFileName] = useState<string>("")
        const [stringData, setStringData] = useState("")

    const helperText: string = getIn(props.touched, props.fieldName) && getIn(props.errors, props.fieldName)

    const getFormatCodeValue = () => {

        if (props.getUploadData.generatedMetadata.formatCode.name !== null && props.getUploadData.generatedMetadata.formatCode.code !== null
            && props.getUploadData.generatedMetadata.formatCode.name !== null) {
            return props.getUploadData.generatedMetadata.formatCode
        }
        else {
            let formatCode: Codes = {
                code: "urn:ad:dk:medcom:phmr:full",
                name: "DK PHMR schema",
                scheme: "1.2.208.184.100.10"
            }
            return formatCode
        }


    }

    const getClassCodeValue = () => {

        if (props.getUploadData.generatedMetadata.classCode.name !== null && props.getUploadData.generatedMetadata.classCode.code !== null
            && props.getUploadData.generatedMetadata.classCode.name !== null) {
            return props.getUploadData.generatedMetadata.classCode
        }
        else {
            let formatCode: Codes = {
                code: "001",
                name: "Clinical report",
                scheme: "1.2.208.184.100.9"
            }
            return formatCode
        }


    }




    return (
        <>
            <Formik initialValues={{
                certificate: {
                    id: "",
                    displayName: "",
                    credentialType: "",
                    subjectSerialNumber: ""
                },
                formatCode: getFormatCodeValue(),
                healthcareFacilityTypeCode: {
                    code: "N/A",
                    name: "N/A",
                    scheme: "2.16.840.1.113883.6.96"
                },
                practiceSettingCode: {
                    code: "N/A",
                    name: "N/A",
                    scheme: "2.16.840.1.113883.6.96"
                },
                availabilityStatus: {
                    name: "Approved",
                    code: "APPROVED",
                    scheme: " "
                }
                ,
                documentType: {
                    name: "Stable",
                    code: "STABLE",
                    scheme: " "
                },
                classCode: getClassCodeValue()
            }}



                onSubmit={async (value) => {


                    if (value.certificate.id.length > 0) {
                        // Create upload request 
                        let request : iti41UploadRequest = {
                         xmlInformation: props.getUploadData.xmlInformation,
                         repository: props.getUploadData.repository,
                            certificateID: value.certificate!.id,
                            responseMetaData: setMetaDataResponse(value, props.getUploadData.generatedMetadata)
                        }
                        console.log(request)

                        let temp : any = await postForm(request)
                           let resp : iti41UploadResponse = temp.data
                        console.log(resp)
                    }
                    else {
                        console.log("ERROR")
                    }


                }}>

                {
                    (formikProps) => (
                        <Form method='POST'>
                            <UploadPreviewWrapper
                                {...formikProps}
                                helperText={helperText}
                                getUploadData={props.getUploadData} />
                        </Form>
                    )
                }
            </Formik>


        </>
    )
}



function setMetaDataResponse(value: any, generatedData: generatedMetadata) {

    let submisionTime = new Date().toISOString()

    let response: responseMetaData = {
        authorInstitution: generatedData.authorInstitution,
        authorPerson: generatedData.authorPerson,
        classCode: value.classCode,
        confidentialityCode: generatedData.confidentialityCode,
        creationTime: generatedData.creationTime,
        eventCode: generatedData.eventCode,
        formatCode: value.formatCode,
        languageCode: generatedData.languageCode,
        legalAuthenticator: generatedData.legalAuthenticator,
        patientId: generatedData.patientId,
        serviceStartTime: generatedData.serviceStartTime,
        serviceStopTime: generatedData.serviceStopTime,
        sourcePatientId: generatedData.sourcePatientId,
        sourcePatientInfo: generatedData.sourcePatientInfo,
        title: generatedData.title,
        typeCode: generatedData.typeCode,
        uniqueId: generatedData.uniqueId,
        objectType: value.documentType,
        availabilityStatus: value.availabilityStatus,
        healthcareFacilityTypeCode: value.healthcareFacilityTypeCode,
        practiceSetting: value.practiceSettingCode,
        submissionTime: submisionTime
    }

    return response
}


