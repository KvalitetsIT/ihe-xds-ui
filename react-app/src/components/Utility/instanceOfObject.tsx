export function instanceOfCredentialInfoResponse(object : any) {
    return 'id' && 'displayName' in object;

} 

export function instanceOfCodes(object : any) {
    return 'code' && 'name' in object;

} 

export function instanceOfIti18Response(object : any) {
    return 'queryResponse' && 'errors' in object;

}

