import './style.css';
import { DateTime } from 'luxon';
import Fuse from 'fuse.js';
import domtoimage from 'dom-to-image';
import type { ListedOpera, TargetOpera } from '@ckirby/opera-info';

const today = DateTime.fromObject(
  {
    hour: 0,
    minute: 0,
    second: 0,
  },
  {
    zone: 'America/Los_Angeles',
  }
);

let operaUrl = '/.netlify/functions/today';
const guessPrompt = document.getElementById('guess-prompt')!;
if (window.location.href.endsWith('random')) {
  operaUrl += '?random=true';
  guessPrompt.textContent = 'Guess a random opera.';
} else {
  // mobile safari will silently re-use an old response unless we update
  // the URL, so add a dummy query param
  // set today to midnight of the current day (west-coast time)

  operaUrl += `?today=${today.toMillis()}`;
}
const params = new URLSearchParams(window.location.search);
if (params.get('href') !== null) {
  operaUrl = `/.netlify/functions/wiki?${params}`;
}
const response = await fetch(operaUrl);
const targetOpera = (await response.json()) as TargetOpera & { today?: string };
if (targetOpera.today) {
  guessPrompt.textContent = `Guess today's opera (🎯) by typing a few letters of a title & pressing 𝚁𝚎𝚝𝚞𝚛𝚗.`;
  document.getElementById(
    'welcome'
  )!.textContent = `Operadle for ${DateTime.fromISO(
    targetOpera.today
  ).toLocaleString(DateTime.DATE_MED)}`;
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

let hints = targetOpera.hints.slice();

const composerPicFragment = (document.getElementById(
  'composer-template'
) as HTMLTemplateElement)!.content.cloneNode(true) as DocumentFragment;
const img = document.createElement('img');
img.src = `/.netlify/functions/image?url=${encodeURIComponent(
  targetOpera.thumbnailUrl
)}`;
const composerPic = composerPicFragment.getElementById('composer-picture')!;
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
const feedbackTemplate = document.getElementById(
  'feedback-template'
) as HTMLTemplateElement;
const hintTemplate = document.getElementById(
  'hint-template'
) as HTMLTemplateElement;
const feedbackSlot = document.querySelector(
  'slot[name="feedback-slot"]'
) as HTMLSlotElement;

const modalOverlay = document.getElementById(
  'modal-overlay'
)! as HTMLDivElement;

const history: { guess?: string; hint?: true }[] = [];

hintButton.onclick = () => {
  history.unshift({ hint: true });
  localStorage.setItem(
    `play-${today.toISO()}`,
    JSON.stringify({
      target: targetOpera.titleHref,
      history,
    } as LocalGame)
  );

  if (
    !document.getElementById('composer-picture') &&
    hints.some((h) => h.category === 'composer')
  ) {
    insertAndScroll(composerPicFragment);
    return;
  }
  const hintRow = hintTemplate.content.cloneNode(true) as DocumentFragment;
  hintRow.querySelector('.feedback-row')?.classList.add('hint');
  const p = hintRow.querySelector('p')!;
  p.textContent = hints.shift()!.hint;
  insertAndScroll(hintRow);
  if (hints.length === 0) {
    hintButton.disabled = true;
  }
};

giveupButton.onclick = () => {
  const feedbackRow = feedbackTemplate.content.cloneNode(
    true
  ) as DocumentFragment;
  const p = feedbackRow.querySelector('p')!;
  p.appendChild(
    wrong`The opera you were looking for was ${targetOpera.title}, ${
      ['English', 'Italian'].includes(targetOpera.language) ? 'an' : 'a'
    } ${targetOpera.language} opera by ${
      targetOpera.composer
    } that premiered in ${targetOpera.year.toString()}.`
  );
  insertAndScroll(feedbackRow);
  disableGuessBtn();
  hintButton.setAttribute('disabled', 'disabled');
  giveupButton.setAttribute('disabled', 'disabled');
  inputEl.setAttribute('disabled', 'disabled');
};

function insertAndScroll(newRow: DocumentFragment | Element) {
  feedbackSlot.after(newRow);
  feedbackSlot.nextElementSibling!.scrollIntoView({ behavior: 'smooth' });
}

async function doGuess() {
  if (!('listIndex' in selectedOperaEl.dataset)) return;

  const guessedOpera = operaList[parseInt(selectedOperaEl.dataset.listIndex!)];

  history.unshift({ guess: guessedOpera.titleHref });

  const feedbackRow = feedbackTemplate.content.cloneNode(
    true
  ) as DocumentFragment;

  const p = feedbackRow.querySelector('p')!;
  const composer = feedbackRow.querySelector('td.composer-feedback')!;
  const date = feedbackRow.querySelector('td.date-feedback')!;
  const language = feedbackRow.querySelector('td.language-feedback')!;
  composer.textContent = guessedOpera.composer;
  date.textContent = guessedOpera.year.toString();
  language.textContent = guessedOpera.language;
  if (guessedOpera.composerHref === targetOpera.composerHref) {
    composer.classList.add('correct-guess');
    // remove all of the composer-category hints
    hints = hints.filter((h) => h.category !== 'composer');
    if (hints.length === 0) {
      hintButton.disabled = true;
    }
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

  if (guessedOpera.titleHref === targetOpera.titleHref) {
    feedbackRow.querySelector('img.correct')!.classList.remove('hide');
    p.querySelector('.correct')?.classList.toggle('hide', false);
    p.querySelector('.incorrect')?.classList.toggle('hide', true);
    p.classList.add('correct');
    p.appendChild(
      correct`${guessedOpera.titles[0]} is the opera you are looking for.`
    );
    showStats();
    inputEl.setAttribute('disabled', 'disabled');
  } else {
    feedbackRow.querySelector('img.incorrect')!.classList.remove('hide');
    p.querySelector('.correct')?.classList.toggle('hide', true);
    p.querySelector('.incorrect')?.classList.toggle('hide', false);
    p.appendChild(
      wrong`${guessedOpera.titles[0]} is not the opera you are looking for.`
    );
  }

  insertAndScroll(feedbackRow);

  inputEl.value = '';
  fuse.removeAt(Number(selectedOperaEl.dataset.refIndex)!);
  disableGuessBtn();

  localStorage.setItem(
    `play-${today.toISO()}`,
    JSON.stringify({
      target: targetOpera.titleHref,
      history,
    } as LocalGame)
  );
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

interface LocalGame {
  target: string;
  history: typeof history;
}

async function showStats() {
  document.getElementById('history-table')?.remove();
  modalOverlay.classList.remove('hide');
  document.getElementById('stats-modal')!.classList.remove('hide');
  const localStorageKeys = Object.keys(localStorage);
  const gameKeys = localStorageKeys.filter((key) => key.startsWith('play-'));
  const playCount = gameKeys.length;
  const games = gameKeys.map(
    (key) => JSON.parse(localStorage.getItem(key)!) as LocalGame
  );
  let correctCount = 0;
  let hintsPerGame = 0;
  let guessesPerGame = 0;
  for (const game of games) {
    if (game.history[0].guess === game.target) {
      correctCount++;
    }
    const guessCount = game.history.filter((h) => h.guess).length;
    guessesPerGame += guessCount / playCount;
    const hintCount = game.history.filter((h) => h.hint).length;
    hintsPerGame += hintCount / playCount;
  }
  document.getElementById('played-count')!.textContent = playCount.toString();
  document.getElementById('win-pct')!.textContent = `${(
    (100 * correctCount) /
    playCount
  ).toFixed(0)}%`;
  document.getElementById(
    'hints-per-game'
  )!.textContent = `${hintsPerGame.toFixed(1)}`;
  document.getElementById(
    'guesses-per-game'
  )!.textContent = `${guessesPerGame.toFixed(1)}`;

  const sharable = (
    document.getElementById('share-template')! as HTMLTemplateElement
  ).content.cloneNode(true) as DocumentFragment;
  const table = sharable.querySelector('table')!;
  table.querySelector('#history-welcome')!.textContent =
    document.getElementById('welcome')!.textContent;
  const headerRow = sharable.getElementById('history-header')!;

  for (const h of history) {
    if (h.hint) {
      const hintRow = (
        document.getElementById('share-hint-row')! as HTMLTemplateElement
      ).content.cloneNode(true) as DocumentFragment;
      headerRow.after(hintRow);
      continue;
    }
    const guessed = operaList.find((o) => o.titleHref === h.guess)!;
    const row = (
      document.getElementById('share-guess-row')! as HTMLTemplateElement
    ).content.cloneNode(true) as DocumentFragment;
    row.querySelector('td:nth-child(1)')!.textContent =
      guessed.composerHref === targetOpera.composerHref ? '🟢' : '🔴';
    row.querySelector('td:nth-child(2)')!.textContent =
      guessed.language === targetOpera.language ? '🟢' : '🔴';
    row.querySelector('td:nth-child(3)')!.textContent =
      guessed.year === targetOpera.year
        ? '🟢'
        : guessed.year < targetOpera.year
        ? '🔻'
        : '🔺';

    headerRow.after(row);
  }
  document.getElementById('stats-content')!.after(sharable);
}

async function copyShareTable(event: Event) {
  // prevent the modal from closing
  event.preventDefault();
  const table = document.getElementById('history-table');
  if (!table) {
    return;
  }

  const html = new Blob([table!.outerHTML], {
    type: 'text/html',
  });
  const imageBlob = await domtoimage.toBlob(table!);

  navigator.clipboard.write([
    new ClipboardItem({
      ['text/html']: html,
      [imageBlob.type]: imageBlob,
    }),
  ]);

  const tableHeight = table.offsetHeight;

  const p = document.getElementById('stats-message')!;
  // make the p the same size as the table
  p.style.height = `${tableHeight}px`;
  p.classList.remove('hide');
  table.classList.add('hide');
  setTimeout(() => {
    p.classList.add('hide');
    table.classList.remove('hide');
  }, 1500);
}

document.getElementById('stats-close-button')!.onclick = hideStats;
modalOverlay.onclick = hideStats;
document.getElementById('show-stats-button')!.onclick = showStats;
document.getElementById('share-stats-button')!.onclick = copyShareTable;

function hideStats(event: Event) {
  if (event.defaultPrevented) return;
  modalOverlay.classList.add('hide');
  document.getElementById('stats-modal')!.classList.add('hide');
}

function disableGuessBtn() {
  selectedOperaEl.textContent = 'My guess';
  delete selectedOperaEl.dataset.refIndex;
  delete selectedOperaEl.dataset.listIndex;
  guessButton.setAttribute('disabled', 'disabled');
}

inputEl.onkeydown = (e) => {
  if (e.key === 'Enter') {
    doGuess();
  }
};
document.body.onkeydown = (e) => {
  // close the modal if the user presses escape
  if (e.key === 'Escape') {
    hideStats(e);
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
