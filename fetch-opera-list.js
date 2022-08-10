import fs from 'fs';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

const listUrl = 'https://en.wikipedia.org/wiki/List_of_operas_by_title';

async function getList() {
  const response = await fetch(listUrl);
  const html = await response.text();
  const dom = new JSDOM(html);
  const content = dom.window.document.getElementById('bodyContent');
  let list = [];
  for (const li of content.querySelectorAll('.mw-parser-output .div-col li')) {
    // <li>
    //   <i><a href="/wiki/L%27abandon_d%27Ariane" title="L'abandon d'Ariane">L'abandon d'Ariane</a></i>,
    //   <a href="/wiki/Darius_Milhaud" title="Darius Milhaud">Darius Milhaud</a>,
    //   <a href="/wiki/1928_in_music#Opera" title="1928 in music">1928</a></li>

    // summaryXHR
    // https://en.wikipedia.org/api/rest_v1/page/summary/L'abandon_d'Ariane
    try {
      const [titleA, composerA, dateA] = [...li.querySelectorAll('a')];
      list.push({
        title: titleA.textContent,
        titleHref: titleA.href,
        composer: composerA.textContent,
        composerHref: composerA.href,
        date: dateA.textContent,
      });
    } catch (error) {
      //
    }
  }
  fs.writeFileSync('raw-opera-list.json', JSON.stringify(list, null, 2));
}

getList();
