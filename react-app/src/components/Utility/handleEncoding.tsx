export function base64Encode(input : string) {
return window.btoa(input) 
}

export function base64Decode(input : string) {
    return window.atob(input) 

}

//encodeURIComponent(uriComponent)


export function urlEncoding(input : string) {
    return encodeURIComponent(input) 

}
export function urlDecoding(input : string) {
    return decodeURIComponent(input) 

}