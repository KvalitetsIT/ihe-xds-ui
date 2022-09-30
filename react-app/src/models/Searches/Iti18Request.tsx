import { CodeQuery } from "./Search"


export interface healthcareProfessionalContext {
    authorizationCode : string | null
    consentOverride : boolean
    role : string

}




export interface iti18QueryParameter {
    patientId? : string
    typeCode? : CodeQuery
    formatCode? : CodeQuery
    healthcareFacilityTypeCode? : CodeQuery
    eventCode? : CodeQuery
    practiceSettingCode? : CodeQuery
    documentType? : string[]
    startFromDate : number | null
    startToDate : number | null
    endFromDate : number | null
    endToDate : number | null
    availabilityStatus? : string

} 


export interface iti18Request {
    queryParameters : iti18QueryParameter
    credentialId : string
    context : healthcareProfessionalContext
} 