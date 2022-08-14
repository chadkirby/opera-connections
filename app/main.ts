import './style.css';
import { DateTime } from 'luxon';
import Fuse from 'fuse.js';
import type { ListedOpera } from '../typings.js';

let operaUrl = '/.netlify/functions/today';
const guessPrompt = document.getElementById('guess-prompt')!;
if (window.location.href.endsWith('random')) {
  operaUrl += '?random=true';
  guessPrompt.textContent = 'Guess a random opera.';
}
const params = new URLSearchParams(window.location.search);
if (params.get('href') !== null) {
  operaUrl = `/.netlify/functions/wiki?${params}`;
}
const today = await fetch(operaUrl);
const targetOpera = await today.json();
if (targetOpera.today) {
  guessPrompt.textContent = `Guess today's opera (🎯) by typing a few letters of a title & pressing 𝚁𝚎𝚝𝚞𝚛𝚗.`;
  guessPrompt.after(document.createElement('br'));
  guessPrompt.after(
    document.createTextNode(
      DateTime.fromISO(targetOpera.today).toLocaleString(DateTime.DATE_MED)
    )
  );
}

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
const hintTemplate = document.getElementById(
  'hint-template'
) as HTMLTemplateElement;
const querySlot = document.querySelector(
  'slot[name="query-slot"]'
) as HTMLSlotElement;
const hintSlot = document.querySelector(
  'slot[name="hint-slot"]'
) as HTMLSlotElement;

hintButton.onclick = () => {
  if (composerPic.classList.contains('hide')) {
    composerPic.classList.toggle('hide');
    return;
  }
  const hintRow = hintTemplate.content.cloneNode(true) as DocumentFragment;
  const p = hintRow.querySelector('p')!;
  p.textContent = hints.shift()!;
  hintSlot.after(hintRow);
  if (hints.length === 0) {
    hintButton.disabled = true;
  }
};

giveupButton.onclick = () => {
  const queryRow = queryTemplate.content.cloneNode(true) as DocumentFragment;
  const p = queryRow.querySelector('p')!;
  p.appendChild(
    wrong`The opera you were looking for was ${targetOpera.title}, ${
      ['English', 'Italian'].includes(targetOpera.language) ? 'an' : 'a'
    } ${targetOpera.language} opera by ${
      targetOpera.composer
    } that premiered in ${targetOpera.year}.`
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
  const composer = queryRow.querySelector('td.composer-feedback')!;
  const date = queryRow.querySelector('td.date-feedback')!;
  const language = queryRow.querySelector('td.language-feedback')!;
  composer.textContent = guessedOpera.composer;
  date.textContent = guessedOpera.year.toString();
  language.textContent = guessedOpera.language;
  if (guessedOpera.titleHref === targetOpera.titleHref) {
    p.querySelector('.correct')?.classList.toggle('hide', false);
    p.querySelector('.incorrect')?.classList.toggle('hide', true);
    p.classList.add('correct');
    p.appendChild(
      correct`${guessedOpera.titles[0]} is the opera you are looking for.`
    );
  } else {
    p.querySelector('.correct')?.classList.toggle('hide', true);
    p.querySelector('.incorrect')?.classList.toggle('hide', false);
    p.appendChild(
      wrong`${guessedOpera.titles[0]} is not the opera you are looking for.`
    );
    p.appendChild(document.createElement('br'));
    if (guessedOpera.composerHref === targetOpera.composerHref) {
      composer.classList.add('correct-guess');
    } else {
      composer.classList.add('wrong-guess');
    }
    if (guessedOpera.language === targetOpera.language) {
      language.classList.add('correct-guess');
    } else {
      language.classList.add('wrong-guess');
    }
    if (guessedOpera.year === targetOpera.year) {
      date.classList.add('correct-guess');
    } else if (targetOpera.year < guessedOpera.year) {
      date.classList.add('wrong-guess');
      date.classList.add('too-late');
    } else {
      date.classList.add('wrong-guess');
      date.classList.add('too-early');
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

  let input = normalize(inputEl.value);
  let [suggestion] = fuse.search(input, { limit: 1 });
  while (!suggestion && input.length > 6) {
    input = input.slice(0, -1);
    [suggestion] = fuse.search(input, { limit: 1 });
  }
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
  selectedOperaEl.textContent = 'My guess';
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

// focus the input element
inputEl.focus();
