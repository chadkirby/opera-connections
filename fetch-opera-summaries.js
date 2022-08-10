import fs from 'fs';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import { promisify } from 'util';

const wait = promisify(setTimeout);

const keeperComposers = [
  'Adams',
  'Barber',
  'Bartók',
  'Beethoven',
  'Bellini',
  'Berg',
  'Berlioz',
  'Bernstein',
  'Bizet',
  'Borodin',
  'Britten',
  'Charpentier',
  'Copland',
  'Debussy',
  'Delibes',
  'Donizetti',
  'Dvořák',
  'Gershwin',
  'Glinka',
  'Gluck',
  'Gounod',
  'Handel',
  'Hindemith',
  'Humperdinck',
  'Leoncavallo',
  'Maazel',
  'Mascagni',
  'Massenet',
  'Menotti',
  'Meyerbeer',
  'Monteverdi',
  'Mozart',
  'Mussorgsky',
  'Offenbach',
  'Peri',
  'Ponchielli',
  'Poulenc',
  'Prokofiev',
  'Puccini',
  'Rachmaninoff',
  'Rimsky-Korsakov',
  'Rossini',
  'Saint-Saëns',
  'Shostakovich',
  'Smetana',
  'Strauss',
  'Tchaikovsky',
  'Verdi',
  'Wagner',
  'Weber',
  'Weill',
  'Williams',
];
const list = JSON.parse(fs.readFileSync('raw-opera-list.json', 'utf8')).filter(
  (o) => keeperComposers.includes(o.composer.split(/\s/).pop())
);

const summaryUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary';
const wikiUrl = 'https://en.wikipedia.org';

const composers = new Map();

async function getSummaries() {
  const summaries = [];
  for (const opera of list) {
    try {
      console.log(`fetching ${opera.title}`);
      const response = await fetch(
        `${summaryUrl}/${opera.titleHref.split('/').pop()}`
      );
      const summary = await response.json();
      if (!composers.has(opera.composerHref)) {
        console.log(`fetching ${opera.composer}`);
        const composer = await fetch(
          `${summaryUrl}/${opera.composerHref.split('/').pop()}`
        );
        composers.set(opera.composerHref, await composer.json());
      }
      const infoBox = await getInfoBox(`${wikiUrl}${opera.titleHref}`);
      summaries.push({
        opera,
        infoBox,
        operaSummary: summary,
        composerSummary: composers.get(opera.composerHref),
      });
      await wait(200);
    } catch (error) {
      console.error(error.message);
    }
  }

  fs.writeFileSync('opera-summaries.json', JSON.stringify(summaries, null, 2));
}

getSummaries();

async function getInfoBox(url) {
  let res = await fetch(url);
  let html = await res.text();
  let doc = new JSDOM(html).window.document;
  let infobox = doc.querySelector('table.infobox');
  if (!infobox) return {};
  try {
    return getInfo(infobox);
  } catch (error) {
    console.error(error.message);
  }
}

function getInfo(infobox) {
  let out = {
    titles: getText(infobox.querySelector('th')).split(/\n/),
  };
  for (const td of infobox.querySelectorAll(
    'th.infobox-label + td.infobox-data'
  )) {
    let label = td.previousElementSibling.textContent;
    for (const span of td.querySelectorAll('[style="display:none"]')) {
      span.remove();
    }
    // <a href="/wiki/Old_Style_and_New_Style_dates" title="Old Style and New Style dates">N.S.</a>
    for (const a of td.querySelectorAll(
      'a[href="/wiki/Old_Style_and_New_Style_dates"]'
    )) {
      a.remove();
    }

    out[label] = getText(td);
  }
  return out;
}

function getText(el) {
  let val = '';
  for (const node of el.childNodes) {
    if (node.nodeType === el.ownerDocument.TEXT_NODE) {
      val += node.textContent;
    } else if (node.nodeType === el.ownerDocument.ELEMENT_NODE) {
      if (node.nodeName.toLowerCase() === 'br') {
        val += '\n';
      } else {
        val += getText(node);
      }
    }
  }
  return val.trim();
}
