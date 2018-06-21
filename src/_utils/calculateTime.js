export const calculateTime = minutes => {
  let days = 0
  let hours = 0
  let min = minutes

  while (min > 60) {
    hours += 1
    min = min - 60
  }

  while (hours > 24) {
    days += 1
    hours = hours - 24
  }

  return days > 0 ?
    `${days} d ${hours} hr` :
    days === 0 && hours > 0 ?
      `${hours} hr ${min} min` :
      `${min} min`
}