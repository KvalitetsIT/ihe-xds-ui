import { registryError } from "../Searches/Iti18Response"
import { Codes } from "../Searches/Search"
import { iti41Repository } from "./Repository"

export interface iti41UploadRequest {
    xmlInformation?: string
    repository?: iti41Repository
    certificateID: string
    responseMetaData?: responseMetaData

}

export interface responseMetaData {
    authorInstitution: Codes
    authorPerson: {
        familyName: string
        givenName: string
        secondAndFurtherGivenNames: string
    }
    classCode: Codes
    confidentialityCode: Codes
    creationTime: string
    eventCode: Codes[]
    formatCode: Codes
    languageCode: Codes
    legalAuthenticator: {
        familyName: string
        givenName: string
        secondAndFurtherGivenNames: string
    }
    patientId: Codes
    serviceStartTime: string
    serviceStopTime: string
    sourcePatientId: Codes
    sourcePatientInfo: {
        familyName: string
        givenName: string
        secondAndFurtherGivenNames: string
        gender: string
        birthTime: string
    }
    title: string
    typeCode: Codes
    uniqueId: string
    objectType: Codes
    availabilityStatus: Codes
    healthcareFacilityTypeCode: Codes
    practiceSetting: Codes
    submissionTime: string
}

export interface iti41UploadResponse {
    resultMessage: string
    uniqueId: string
    errors: registryError[]

}