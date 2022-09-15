

export function formatTimeFromIti18Response(number : number) {

    let date : Date = new Date(number)

    let day, month, year, hour, minute, second: number
    day = date.getDate()

    month =  date.getMonth() + 1

    year = date.getFullYear()

    hour = date.getHours()

    minute= date.getMinutes()

    second = date.getSeconds()


    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}\n${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`




} 