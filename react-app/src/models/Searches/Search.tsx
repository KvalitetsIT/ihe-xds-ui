
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
    serviceStart? : Date[]
    serviceEnd? : Date[]
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


