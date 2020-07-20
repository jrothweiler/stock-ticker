// format a number for use in the timer, i.e. pad numbers less than 10 with leading zeroes
function padNumber(value) {
    return value.toString().padStart(2, '0');
}

// formats the given centisecond time in MM:SS.CC notation.
export function formatTimeForGraph(currentDate) {
    const [year, month, day, hours, minutes] = [
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate(),
        currentDate.getHours(),
        currentDate.getMinutes()
    ].map(padNumber)

    return `${year}-${month}-${day} ${hours}:${minutes}`
}