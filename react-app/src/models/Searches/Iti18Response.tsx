

export interface Iti18QueryResponse {
    documentId: string
    documentType: string
    patientId: string
    repositoryID: string
    serviceEnd: number
    serviceStart: number
}

export interface Iti18Response {
    queryResponse : Iti18QueryResponse[]
    requestId : string
    responseId : string
    errors: registryError[]
}

export interface registryError {
    codeContext : string 
    errorCode : string
    severity : Serverity

}

enum Serverity {
    ERROR,
    WARNING
  }