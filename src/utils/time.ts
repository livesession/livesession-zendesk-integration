type Duration = string | number

function msToTime(dur: number): {
    hours: Duration,
    minutes: Duration,
    seconds: Duration
} {
    let seconds: Duration = Math.floor((dur / 1000) % 60)
    let minutes: Duration = Math.floor((dur / (1000 * 60)) % 60)
    let hours: Duration = Math.floor((dur / (1000 * 60 * 60)) % 24)

    hours = hours < 10 ? "0" + hours : hours
    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds

    return {
        hours,
        minutes,
        seconds,
    }
}

export function renderTimeFormatted(time: number): string {
    const duration = time
    const formattedTime = msToTime(duration)
    return `${formattedTime.hours > 0 ? formattedTime.hours + ":" : ""}${formattedTime.minutes}:${formattedTime.seconds}`
}

export function friendlyDate(timestamp: number) {
    //@ts-ignore
    return new Intl.DateTimeFormat('en-US', {dateStyle: "full"}).format(timestamp)
}