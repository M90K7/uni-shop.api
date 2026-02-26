
export function toFaDate(date: Date | string) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toLocaleString('fa-IR', {
    timeZone: 'Asia/Tehran',
    numberingSystem: 'latn'
  });
}