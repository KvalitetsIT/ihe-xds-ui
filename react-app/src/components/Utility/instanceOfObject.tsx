export function instanceOfCredentialInfoResponse(object : any) {
    return 'id' && 'displayName' in object;

} 

export function instanceOfCodes(object : any) {
    return 'code' && 'name' in object;

} 

