import './style.css';
import Fuse from 'fuse.js';
import type { ListedOpera, OperaData } from '../typings.js';

// import operas, { normalize } from './operas';
// import type { OperaData } from './operas';

const today = await fetch('/.netlify/functions/today');
const targetOpera = await today.json();

const operas = await fetch('/.netlify/functions/operas');
const operaList = (await operas.json()) as ListedOpera[];

// const composers = [...new Set(operas.map((o) => o.composer))].sort();
// const languages = [...new Set(operas.map((o) => o.language))].sort();
// const dates = [...new Set(operas.map((o) => Number(o.date)))].sort((a, z) => a - z);
// const dateRange = [dates[0], dates[dates.length - 1]];

// const useMiles = window.navigator.language === 'en-US';
// const km = useMiles ? 'mi' : 'km';

// const locations: Record<string, { capital: string; loc: [number, number] }> = {
//   Croatian: { capital: 'Zagreb', loc: [45.815399, 15.966568] },
//   Czech: { capital: 'Prague', loc: [50.073658, 14.41854] },
//   Danish: { capital: 'Copenhagen', loc: [55.6760968, 12.5683371] },
//   English: { capital: 'London', loc: [51.5073509, -0.1277583] },
//   French: { capital: 'Paris', loc: [48.856614, 2.3522219] },
//   German: { capital: 'Berlin', loc: [52.5200066, 13.404954] },
//   Hungarian: { capital: 'Budapest', loc: [47.162494, 19.503304] },
//   Italian: { capital: 'Rome', loc: [41.9027835, 12.4963655] },
//   Latin: { capital: 'Rome', loc: [41.9027835, 12.4963655] },
//   Polish: { capital: 'Warsaw', loc: [52.2296756, 21.0122287] },
//   Russian: { capital: 'Moscow', loc: [55.755826, 37.6173] },
//   Spanish: { capital: 'Madrid', loc: [40.416775, -3.70379] },
//   Swedish: { capital: 'Stockholm', loc: [59.3293235, 18.0685808] },
//   Turkish: { capital: 'Istanbul', loc: [41.0344, 28.9653] },
// };

const fuse = new Fuse(
  operaList.map((o) => ({ ...o, normalizedTitles: o.titles.map(normalize) })),
  {
    keys: ['normalizedTitles'],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.2,
  }
);

function normalize(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s/g, ' ')
    .replace(/[^\w\s]/g, '_')
    .trim();
}

// const url = new URL(targetOpera.composerThumbnail.source);
// const ext = url.pathname.split('.').pop()?.toLowerCase();
// const filename = `${decodeURIComponent(
//   targetOpera.composerHref.split('/').pop()!
// ).replace('_(composer)', '')}.${ext}`;

const img = document.createElement('img');
img.src = `/.netlify/functions/image?url=${encodeURIComponent(
  targetOpera.thumbnailUrl
)}`;
// img.height = targetOpera.thumbnail.height;
// img.width = targetOpera.thumbnail.width;
document.getElementById('composer-picture')?.appendChild(img);
document.getElementById('composer-shower')!.onclick = () => {
  document.getElementById('composer-picture')?.classList.toggle('hide');
  document.getElementById('composer-shower')?.classList.toggle('hide');
};

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

async function doGuess() {
  if (!('refIndex' in selectedOperaEl.dataset)) return;

  const guessedOpera = operaList[parseInt(selectedOperaEl.dataset.refIndex!)];

  guesses.unshift(guessedOpera);
  const result = await fetch(
    `/.netlify/functions/guess?${new URLSearchParams({
      guessedTitleHref: guessedOpera.title,
      targetTitleHref: targetOpera.titleHref,
    })}`
  );

  console.log(await result.json());
  const queryRow = queryTemplate.content.cloneNode(true) as DocumentFragment;

  const p = queryRow.querySelector('p')!;
  p.textContent = guessedOpera.titles[0];

  slot.before(queryRow);

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
