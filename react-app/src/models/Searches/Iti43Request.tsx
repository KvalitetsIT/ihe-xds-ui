import { healthcareProfessionalContext } from "./Iti18Request"

export interface iti43Request {
    queryParameters : iti43QueryParameter
    credentialId : string
    context : healthcareProfessionalContext
} 


export interface iti43QueryParameter {
    patientId : string
    documentId : string
    repositoryId : string
} 
