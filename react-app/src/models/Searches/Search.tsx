import { Moment } from "moment"

// Start object,
export interface Search {
    certificate? : CredentialInfoResponse
    typeCode? : Codes 
    formatCode? : Codes 
    healthcareFacilityTypeCode? : Codes 
    eventCode? : Codes 
    practiceSettingCode? : Codes 
    availabilityStatus? : Codes 
    documentType? : boolean[] 
    serviceStart : Moment[] | null[]
    serviceEnd : Moment[] | null[]
    patientId? : string
    uniqueId? : string 
    eventCodeInput? : string
    authorizationCode? : string
    breakTheGlass : boolean
    role : string
    

}


export interface CredentialInfoResponse {
    id : string
    displayName : string
    credentialType : credentialType
    subjectSerialNumber : string
}

export interface Codes {
    name : string
    code : string
    scheme : string
}


export interface CodeQuery {
    code : string
    codeScheme : string
}


export enum credentialType {
    HEALTHCAREPROFESSIONAL,
    SYSTEM
  }