import { Codes } from "./Search"


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


export interface iti18ResponseUnique {
    authorInstitution: Codes
  authorPerson: string
  availabilityStatus: Codes
  classCode : Codes
  comments: string
  confidentialityCode: Codes
  creationTime: number
  documentAvailability: Codes
  entryUuid: string
  eventCode: Codes[]
  errors: registryError[]
  extraMetadata: string
  formatCode: Codes
  hash: string
  healthCareFacilityType:Codes
  homeComunity: string
  languageCode: string
  legalAuthenticator: string
  logicalUuid: string
  mimeType: string
  objectType: string
  practiceSettingCode: Codes
  repositoryUniqueId: string
  serviceStartTime: number
  serviceStopTime: number
  size: number
  sourcePatientId: string
  sourcePatientInfo: {
    name: string
    gender: Gender
    birthTime: number
  }
  title : string
  type: Codes
  typeCode: Codes
  uniqueId: string
  uri: string
  version: number
}

export interface registryError {
    codeContext : string 
    errorCode : string
    severity : Serverity
    customErrorCode : string

}

enum Serverity {
    ERROR,
    WARNING
  }

  enum Gender {
    M,
    F,
    UNI
  }