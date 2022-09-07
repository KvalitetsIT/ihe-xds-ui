export default function formatDateTime(date : Date) {

    let day, month, year, hour, minute, second: number

    day = date.getDate()

    month =  date.getMonth() + 1

    year = date.getFullYear()

    hour = date.getHours()

    minute= date.getMinutes()

    second = date.getSeconds()


    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}Z`

}