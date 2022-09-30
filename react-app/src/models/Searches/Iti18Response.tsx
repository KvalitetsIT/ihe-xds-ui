

export interface Iti18QueryResponse {
    documentId: string
    documentType: string
    patientId: string
    repositoryID: string
    serviceEnd: number
    serviceStart: number
}

export interface Iti18Response {
    queryResponse : Iti18QueryResponse
    requestId : string
    responseId : string
}