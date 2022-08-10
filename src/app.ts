import Fuse from 'fuse.js';
// import { distance } from 'fastest-levenshtein';
// @ts-expect-error no type information available
import { RadialGauge } from 'canvas-gauges';

import operas, { normalize } from './operas';
import type { OperaData } from './operas';

const composers = [...new Set(operas.map((o) => o.composer))].sort();
const languages = [...new Set(operas.map((o) => o.language))].sort();
// const dates = [...new Set(operas.map((o) => Number(o.date)))].sort((a, z) => a - z);
// const dateRange = [dates[0], dates[dates.length - 1]];

const useMiles = window.navigator.language === 'en-US';
const km = useMiles ? 'mi' : 'km';

const locations: Record<string, { capital: string; loc: [number, number] }> = {
  Croatian: { capital: 'Zagreb', loc: [45.815399, 15.966568] },
  Czech: { capital: 'Prague', loc: [50.073658, 14.41854] },
  Danish: { capital: 'Copenhagen', loc: [55.6760968, 12.5683371] },
  English: { capital: 'London', loc: [51.5073509, -0.1277583] },
  French: { capital: 'Paris', loc: [48.856614, 2.3522219] },
  German: { capital: 'Berlin', loc: [52.5200066, 13.404954] },
  Hungarian: { capital: 'Budapest', loc: [47.162494, 19.503304] },
  Italian: { capital: 'Rome', loc: [41.9027835, 12.4963655] },
  Latin: { capital: 'Rome', loc: [41.9027835, 12.4963655] },
  Polish: { capital: 'Warsaw', loc: [52.2296756, 21.0122287] },
  Russian: { capital: 'Moscow', loc: [55.755826, 37.6173] },
  Spanish: { capital: 'Madrid', loc: [40.416775, -3.70379] },
  Swedish: { capital: 'Stockholm', loc: [59.3293235, 18.0685808] },
  Turkish: { capital: 'Istanbul', loc: [41.0344, 28.9653] },
};

const fuse = new Fuse<OperaData>(operas, {
  keys: ['normalizedTitles'],
  includeMatches: true,
  minMatchCharLength: 2,
  threshold: 0.2,
});

const origin = new Date('2022-07-31T08:00:00');
const today = new Date();
today.setUTCHours(8, 0, 0, 0); // last midnight, GMT+8
console.log(today.toUTCString());
const daysSinceOrigin = Math.floor(
  (today.getTime() - origin.getTime()) / 86400000
);

const targetIndex = daysSinceOrigin % operas.length;
const targetOpera = operas[targetIndex];
console.log({ ...targetOpera, targetIndex });

const img = document.createElement('img');
img.src = targetOpera.thumbnail.source;
img.height = targetOpera.thumbnail.height;
img.width = targetOpera.thumbnail.width;
document.querySelector('.query-row')?.appendChild(img);

const inputEl = document.getElementById('opera-input') as HTMLInputElement;
const guessButton = document.getElementById(
  'guess-button'
)! as HTMLButtonElement;
const selectedOperaEl = guessButton; // document.getElementById("selected-opera")!;
const queryTemplate = document.getElementById(
  'query-template'
) as HTMLTemplateElement;
const slot = document.querySelector(
  'slot[name="query-slot"]'
) as HTMLSlotElement;

const guesses: OperaData[] = [];

function doGuess() {
  if (!('refIndex' in selectedOperaEl.dataset)) return;

  const guessedOpera: OperaData =
    operas[parseInt(selectedOperaEl.dataset.refIndex!)];

  guesses.push(guessedOpera);

  const queryRow = queryTemplate.content.cloneNode(true) as HTMLElement;

  // scoreRow.querySelector('.composer-score h3')!.textContent = lastFirst(
  //   guessedOpera.composer
  // );
  // scoreRow.querySelector('.language-score h3')!.textContent =
  //   guessedOpera.language;
  // scoreRow.querySelector(
  //   '.date-score h3'
  // )!.textContent = `Premiered in ${guessedOpera.date}`;

  // const id = `score-row-${document.body.childElementCount}`;
  // scoreRow.id = id;

  // scoreRow.querySelector('h2')!.textContent = selectedOperaEl.textContent;

  slot.insertAdjacentElement('beforebegin', queryRow);

  const guessedIndex = composers.indexOf(guessedOpera.composer);
  let ordinal = (guessedIndex + 1).toString();
  if (ordinal.endsWith('1')) ordinal += 'st';
  if (ordinal.endsWith('2')) ordinal += 'nd';
  if (ordinal.endsWith('3')) ordinal += 'rd';
  if (/\d$/.test(ordinal)) ordinal += 'th';
  const composerDist = guessedIndex - composers.indexOf(targetOpera.composer);
  // const composerCanvas = document
  //   .getElementById(id)!
  //   .querySelector('.composer-score canvas') as HTMLCanvasElement;
  // composerCanvas.setAttribute(
  //   'title',
  //   composerDist
  //     ? `Your guess was written by ${
  //         guessedOpera.composer.split(',')[0]
  //       }, but you are looking for an opera by a composer whose name is ${
  //         targetIndex < guessedIndex ? 'later' : 'earlier'
  //       } in the alphabet.`
  //     : `Your guess was written by ${lastFirst(
  //         guessedOpera.composer
  //       )}, who is the composer you are looking for.`
  // );

  // const dateDist = Number(targetOpera.date) - Number(guessedOpera.date);
  // const dateCanvas = document
  //   .getElementById(id)!
  //   .querySelector('.date-score canvas') as HTMLCanvasElement;
  // dateCanvas?.setAttribute(
  //   'title',
  //   dateDist
  //     ? `Your guess premiered in ${
  //         guessedOpera.date
  //       }, but you are looking for an opera that premiered ${dateDist} years ${
  //         dateDist > 0 ? 'later' : 'earlier'
  //       }.`
  //     : `Your guess premiered in ${guessedOpera.date}, which is the year you are looking for.`
  // );

  // const guessLoc = locations[guessedOpera.language];
  // const targetLoc = locations[targetOpera.language];
  // const languageDist = calcCrow(...guessLoc.loc, ...targetLoc.loc);
  // const languageCanvas = document
  //   .getElementById(id)!
  //   .querySelector('.language-score canvas') as HTMLCanvasElement;
  // languageCanvas?.setAttribute(
  //   'title',
  //   languageDist
  //     ? `Your guess is sung in ${guessedOpera.language}, which is spoken in ${
  //         guessLoc.capital
  //       }, which is ${languageDist.toFixed(
  //         0
  //       )}${km} away from the capital of the country where they speak the language you seek.`
  //     : `Your guess is sung in ${guessedOpera.language}, which is the language you are looking for.`
  // );

  inputEl.value = '';
  fuse.removeAt(Number(selectedOperaEl.dataset.refIndex)!);
  disableGuessBtn();
}

guessButton.onclick = doGuess;

inputEl.oninput = () => {
  selectedOperaEl.textContent = '';

  const input = inputEl.value;
  const [suggestion] = fuse.search(normalize(input), { limit: 1 });
  if (suggestion) {
    guessButton.removeAttribute('disabled');
    const [
      {
        indices: [indices],
        key,
      },
    ] = suggestion.matches!;
    selectedOperaEl.dataset.refIndex = suggestion.refIndex.toString();
    if (key === 'normalized') {
      const [before, match, after] = split(
        suggestion.item.titles[0] || '',
        indices
      );

      selectedOperaEl.appendChild(document.createTextNode(before));
      const strong = document.createElement('strong');
      strong.textContent = match;
      selectedOperaEl.appendChild(strong);
      selectedOperaEl.appendChild(document.createTextNode(after));
    } else {
      selectedOperaEl.textContent = suggestion.item.titles[0];
    }
  } else {
    disableGuessBtn();
  }
};

function disableGuessBtn() {
  selectedOperaEl.textContent = 'Unknown opera';
  delete selectedOperaEl.dataset.refIndex;
  guessButton.setAttribute('disabled', 'disabled');
}

inputEl.onkeydown = (e) => {
  if (e.key === 'Enter') {
    doGuess();
  }
};

function split(title: string, indices: [number, number]) {
  let curr = 0;
  const result: string[] = [];
  for (const index of indices) {
    result.push(title.substring(curr, index + 1));
    curr = index + 1;
  }
  result.push(title.substring(curr));
  return result;
}

// This function takes in latitude and longitude of two location and
// returns the distance between them as the crow flies (in km)
function calcCrow(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  if (useMiles) return d * 0.621371;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value: number): number {
  return (Value * Math.PI) / 180;
}

function lastFirst(name: string): string {
  return name.split(', ').reverse().join(' ');
}
