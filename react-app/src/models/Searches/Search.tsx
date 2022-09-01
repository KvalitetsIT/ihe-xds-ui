export interface Search {
    certificate? : ID
    typeCode : Codes | undefined 
    formatCode : Codes | undefined
    healthcareFacilityTypeCode : Codes | undefined

}


export interface ID {
    id : string
}

export interface Codes {
    code : string
    name : string
    scheme : string
}