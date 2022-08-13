import './style.css';
import Fuse from 'fuse.js';
import type { ListedOpera } from '../typings.js';

let operaUrl = '/.netlify/functions/today';
if (window.location.href.endsWith('random')) {
  operaUrl += '?random=true';
  document.getElementById('guess-prompt')!.textContent =
    'Guess a random opera.';
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

const hints = targetOpera.hints.slice();

const img = document.createElement('img');
img.src = `/.netlify/functions/image?url=${encodeURIComponent(
  targetOpera.thumbnailUrl
)}`;
const composerPic = document.getElementById('composer-picture')!;
composerPic?.appendChild(img);

const inputEl = document.getElementById('opera-input') as HTMLInputElement;
const guessButton = document.getElementById(
  'guess-button'
)! as HTMLButtonElement;
const hintButton = document.getElementById('hint-button')! as HTMLButtonElement;
const giveupButton = document.getElementById(
  'giveup-button'
)! as HTMLButtonElement;
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

// focus the input element
inputEl.focus();

hintButton.onclick = () => {
  if (composerPic.classList.contains('hide')) {
    composerPic.classList.toggle('hide');
    return;
  }
  const queryRow = queryTemplate.content.cloneNode(true) as DocumentFragment;
  const p = queryRow.querySelector('p')!;
  p.textContent = hints.shift()!;
  hintSlot.after(queryRow);
  if (hints.length === 0) {
    hintButton.disabled = true;
  }
};

giveupButton.onclick = () => {
  const queryRow = queryTemplate.content.cloneNode(true) as DocumentFragment;
  const p = queryRow.querySelector('p')!;
  p.appendChild(
    wrong`The opera you were looking for was ${targetOpera.title}, an ${targetOpera.language} opera by ${targetOpera.composer} that premiered in ${targetOpera.year}.`
  );
  querySlot.before(queryRow);
  disableGuessBtn();
  hintButton.setAttribute('disabled', 'disabled');
  giveupButton.setAttribute('disabled', 'disabled');
  inputEl.setAttribute('disabled', 'disabled');
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
    p.appendChild(
      correct`🎉 ${guessedOpera.titles[0]} is the opera you are looking for.`
    );
  } else {
    p.appendChild(
      wrong`😢 ${guessedOpera.titles[0]} is not the opera you are looking for.`
    );
    p.appendChild(document.createElement('br'));
    const remarks = [];
    if (guessedOpera.composerHref === targetOpera.composerHref) {
      if (guesses[1]?.composerHref !== targetOpera.composerHref) {
        remarks.push(correct`was composed by ${targetOpera.composer}`);
      }
    } else {
      remarks.push(wrong`was not composed by ${guessedOpera.composer}`);
    }
    if (guessedOpera.language === targetOpera.language) {
      if (guesses[1]?.language !== targetOpera.language) {
        remarks.push(correct`was in ${targetOpera.language}`);
      }
    } else {
      remarks.push(wrong`was not in ${guessedOpera.language}`);
    }
    if (guessedOpera.year === targetOpera.year) {
      if (guesses[1]?.year !== targetOpera.year) {
        remarks.push(correct`did premiere in ${targetOpera.year}`);
      }
    } else if (targetOpera.year < guessedOpera.year) {
      remarks.push(wrong`premiered before ${guessedOpera.year.toString()}`);
    } else {
      remarks.push(wrong`premiered after ${guessedOpera.year.toString()}`);
    }
    p.appendChild(document.createTextNode('The opera you are looking for: '));
    for (const [i, remark] of remarks.entries()) {
      if (remarks.length > 1 && i === remarks.length - 1) {
        p.appendChild(document.createTextNode('and '));
      }
      p.appendChild(remark);
      if (i < remarks.length - 1) {
        p.appendChild(document.createTextNode('; '));
      } else {
        p.appendChild(document.createTextNode('.'));
      }
    }
  }

  querySlot.after(queryRow);

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
    result.push(title.substring(curr, index));
    curr = index;
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

// tagged template function to output a <span> element with the given text content
function wrong(
  literals: TemplateStringsArray,
  ...values: string[]
): HTMLSpanElement {
  const span = getSpan(literals, ...values);
  span.classList.add('wrong-guess');
  return span;
}
// tagged template function to output a <span> element with the given text content
function correct(
  literals: TemplateStringsArray,
  ...values: string[]
): HTMLSpanElement {
  const span = getSpan(literals, ...values);
  span.classList.add('correct-guess');
  return span;
}

function getSpan(literals: TemplateStringsArray, ...values: string[]) {
  const span = document.createElement('span');
  for (const i of literals.keys()) {
    span.appendChild(document.createTextNode(literals[i]));
    const val = values[i];
    if (val) {
      const strong = document.createElement('strong');
      strong.textContent = val;
      span.appendChild(strong);
    }
  }
  return span;
}
