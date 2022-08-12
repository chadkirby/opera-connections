import './style.css';
import Fuse from 'fuse.js';
import type { ListedOpera } from '../typings.js';
import { makeHints } from './hints.js';

let operaUrl = '/.netlify/functions/today';
if (window.location.href.endsWith('random')) {
  operaUrl += '?random=true';
}
const params = new URLSearchParams(window.location.search);
if (params.get('href') !== null) {
  operaUrl = `/.netlify/functions/wiki?${params}`;
}
const today = await fetch(operaUrl);
const targetOpera = await today.json();
console.log(targetOpera.title);

const operas = await fetch('/.netlify/functions/operas');
const operaList = (await operas.json()) as ListedOpera[];

const fuse = new Fuse(
  operaList.map((o, i) => ({
    ...o,
    normalizedTitles: o.titles.map(normalize),
    listIndex: i,
  })),
  {
    keys: ['normalizedTitles'],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.2,
  }
);

const hints = makeHints(targetOpera);

const img = document.createElement('img');
img.src = `/.netlify/functions/image?url=${encodeURIComponent(
  targetOpera.thumbnailUrl
)}`;
document.getElementById('composer-picture')?.appendChild(img);
document.getElementById('composer-shower')!.onclick = () => {
  document.getElementById('composer-picture')?.classList.toggle('hide');
  document.getElementById('composer-shower')?.classList.toggle('hide');
};

const inputEl = document.getElementById('opera-input') as HTMLInputElement;
const guessButton = document.getElementById(
  'guess-button'
)! as HTMLButtonElement;
const hintButton = document.getElementById('hint-button')! as HTMLButtonElement;
const selectedOperaEl = guessButton; // document.getElementById("selected-opera")!;
const queryTemplate = document.getElementById(
  'query-template'
) as HTMLTemplateElement;
const querySlot = document.querySelector(
  'slot[name="query-slot"]'
) as HTMLSlotElement;
const hintSlot = document.querySelector(
  'slot[name="hint-slot"]'
) as HTMLSlotElement;

hintButton.onclick = () => {
  const queryRow = queryTemplate.content.cloneNode(true) as DocumentFragment;
  const p = queryRow.querySelector('p')!;
  p.textContent = hints.shift()!;
  hintSlot.before(queryRow);
  if (hints.length === 0) {
    hintButton.disabled = true;
  }
};

const guesses: ListedOpera[] = [];

async function doGuess() {
  if (!('listIndex' in selectedOperaEl.dataset)) return;

  const guessedOpera = operaList[parseInt(selectedOperaEl.dataset.listIndex!)];

  guesses.unshift(guessedOpera);

  const queryRow = queryTemplate.content.cloneNode(true) as DocumentFragment;

  const p = queryRow.querySelector('p')!;
  if (guessedOpera.titleHref === targetOpera.titleHref) {
    p.classList.add('correct');
    p.textContent = 'Correct!';
  } else {
    const remarks = [
      `Sorry, ${guessedOpera.titles[0]} is not the opera you are looking for.`,
    ];
    if (guessedOpera.composerHref === targetOpera.composerHref) {
      if (guesses[1]?.composerHref !== targetOpera.composerHref) {
        remarks.push(
          `But the opera you are looking for was composed by ${targetOpera.composer}!`
        );
      }
    } else {
      remarks.push(
        `The opera you are looking for was not composed by ${guessedOpera.composer}.`
      );
    }
    if (guessedOpera.language === targetOpera.language) {
      if (guesses[1]?.language !== targetOpera.language) {
        remarks.push(
          `But the opera you are looking for was in ${targetOpera.language}!`
        );
      }
    } else {
      remarks.push(
        `The opera you are looking for was not in ${guessedOpera.language}.`
      );
    }
    if (guessedOpera.year === targetOpera.year) {
      if (guesses[1]?.year !== targetOpera.year) {
        remarks.push(
          `But the opera you are looking for did premiere in ${targetOpera.year}!`
        );
      }
    } else if (guessedOpera.year < targetOpera.year) {
      remarks.push(
        `The opera you are looking for premiered before ${guessedOpera.year}.`
      );
    } else {
      remarks.push(
        `The opera you are looking for premiered after ${guessedOpera.year}.`
      );
    }
    for (const remark of remarks) {
      p.appendChild(document.createTextNode(remark));
      p.appendChild(document.createElement('br'));
    }
  }

  querySlot.before(queryRow);

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
    selectedOperaEl.dataset.listIndex = suggestion.item.listIndex.toString();
    if (key === 'normalizedTitles') {
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

function normalize(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s/g, ' ')
    .replace(/[^\w\s]/g, '_')
    .trim();
}
