function parseTime(timeStr: string): number {
  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  const periodUpper = period.toUpperCase();
  if (periodUpper === 'PM' && hours !== 12) hours += 12;
  if (periodUpper === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

export function compareTimes(timeA: string, timeB: string): number {
  const a = parseTime(timeA);
  const b = parseTime(timeB);
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}

