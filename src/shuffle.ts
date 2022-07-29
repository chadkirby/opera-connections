const DAY = 3600 * 24 * 1000;

export function shuffle<T>(array: T[], startDate: Date) {
  const startDay = startDate.getTime() / DAY;
  const currentDay = Date.now() / DAY;
  let seed = Math.floor((currentDay - startDay) / array.length);

  const result = [...array];
  for (let i = array.length - 1; i > 0; i--, seed++) {
    const n = Math.round(badRandom(seed) * i);
    const temp = result[i];
    result[i] = result[n];
    result[n] = temp;
  }

  return result;
}

function badRandom(seed = 0) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
