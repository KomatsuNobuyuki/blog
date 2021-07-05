type SeparatorString = '.' | '/';

export function getFormatedDate(date: Date, separotor: SeparatorString = '.') {
  const _date = date;
  const year = _date.getFullYear();
  const month = _date.getMonth() + 1;
  const day = _date.getDate();

  return `${year}${separotor}${month}${separotor}${day}`;
}