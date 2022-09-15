import { Moment } from "moment"

export default function formatDateTime(date : Moment) {



    let newdate : Date  = new Date(Date.parse("" + date.toString()))
    
 

    let day, month, year, hour, minute, second: number

    day = newdate.getDate()

    month =  newdate.getMonth() + 1

    year = newdate.getFullYear()

    hour = newdate.getHours()

    minute= newdate.getMinutes()

    second = newdate.getSeconds()


    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}Z`

}