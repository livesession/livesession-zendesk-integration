type Duration = string | number;

function msToTime(dur: number): {
  hours: Duration;
  minutes: Duration;
  seconds: Duration;
} {
  let seconds: Duration = Math.floor((dur / 1000) % 60);
  let minutes: Duration = Math.floor((dur / (1000 * 60)) % 60);
  let hours: Duration = Math.floor((dur / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return {
    hours,
    minutes,
    seconds,
  };
}

export function renderTimeFormatted(time: number | undefined): string {
  if (!time) {
    return "";
  }

  const duration = time;
  const formattedTime = msToTime(duration);
  return `${formattedTime.hours > 0 ? formattedTime.hours + ":" : ""}${
    formattedTime.minutes
  }:${formattedTime.seconds}`;
}

//@ts-ignore
const fullENUSTime = new Intl.DateTimeFormat("en-US", { dateStyle: "full" });
const shortMonthENUSTime = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

export function friendlyFullDate(timestamp: number | undefined) {
  if (!timestamp) {
    return "";
  }

  return fullENUSTime.format(timestamp);
}

export function friendlyShortMonthDate(timestamp: number) {
  return shortMonthENUSTime.format(timestamp);
}
