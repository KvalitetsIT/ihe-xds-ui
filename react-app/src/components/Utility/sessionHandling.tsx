import uuid from 'react-uuid';

const sessionName = "session"

export function setSession() {

    const ses : Session = {
        id : generateID(),
        issued : new Date().valueOf()
    }
   let json = JSON.stringify(ses)

   window.localStorage.setItem(sessionName, json)

}

export function isDayLater() {
    let obj: Session = JSON.parse(window.localStorage.getItem(sessionName)!)


    
    if (new Date().valueOf()> (obj.issued + 864E5) ){
        return true
    }
    else {
        return false

    }
}


function generateID() {
    return "" + uuid()
}


interface Session {
    id: string
    issued: number 
}


export function getSession() {
    let obj: Session = JSON.parse(window.localStorage.getItem(sessionName)!)

    return obj.id

}