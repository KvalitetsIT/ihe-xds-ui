export default function instanceOfCredentialInfoResponse(object : any) {
    return 'id' && 'displayName' in object;

} 