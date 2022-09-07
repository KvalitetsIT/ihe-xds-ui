import { CodeQuery, ID } from "./Search"


export interface healthcareProfessionalContext {
    actingUserId : string
    responsibleUserId : string 
    authorizationCode : string
    consentOverride : boolean
    organisationCode : string

}




export interface iti18QueryParameter {
    patientId? : string
    typeCode? : CodeQuery
    formatCode? : CodeQuery
    healthcareFacilityTypeCode? : CodeQuery
    eventCode? : CodeQuery
    practiceSettingCode? : CodeQuery
    documentType? : string[]
    startFromDate? : string
    startToDate? : string
    endFromDate? : string
    endToDate? : string
    availabilityStatus? : string

} 


export interface iti18Request {
    queryParameters : iti18QueryParameter
    credentialId : string
    context : healthcareProfessionalContext
} 