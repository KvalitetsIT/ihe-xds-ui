import { Moment } from "moment"

// Start object,
export interface Search {
    certificate? : ID
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
    

}


export interface ID {
    id : string
}

export interface Codes {
    code : string
    name : string
    scheme : string
}


export interface CodeQuery {
    code : string
    codeScheme : string
}


