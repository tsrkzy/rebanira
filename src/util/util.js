export function dateFormat(date) {
  const y = `${date.getFullYear()}`.padStart(4, "0");
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  const h = `${date.getHours()}`.padStart(2, "0");
  const i = `${date.getMinutes()}`.padStart(2, "0");
  const s = `${date.getSeconds()}`.padStart(2, "0");

  return `${y}/${m}/${d} ${h}:${i}:${s}`;
}
