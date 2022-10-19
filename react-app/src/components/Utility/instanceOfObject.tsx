export function instanceOfCredentialInfoResponse(object : any) {
    return 'id' && 'displayName' in object;

} 

export function instanceOfCodes(object : any) {
    if (object === null || object === undefined ||  typeof object === 'number') {
        return false
    }
    return 'code' && 'name' in object;

} 

export function instanceOfIti18Response(object : any) {
    return 'queryResponse' && 'errors' in object;

}

