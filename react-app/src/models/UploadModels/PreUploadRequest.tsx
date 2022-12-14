import { Codes } from "../Searches/Search"
import { iti41Repository } from "./Repository"

export interface iti41PreUploadRequest {
    xmlInformation?: string
    repository?: iti41Repository

}

export interface iti41PreviewResponse {
    xmlInformation?: string
    repository?: iti41Repository
    generatedMetadata?: generatedMetadata
}

export interface generatedMetadata {
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
    isLegalDocument: boolean
}