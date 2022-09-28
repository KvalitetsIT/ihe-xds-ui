import uuid from 'react-uuid';

const sessionName = "session"

export function handleSession() {


   window.sessionStorage.setItem(sessionName, generateID())

}




function generateID() {
    return "" + uuid()
}



export function getSession() {
    

    return window.sessionStorage.getItem(sessionName)!

}