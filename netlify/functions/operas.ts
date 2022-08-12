import fs from 'fs';
import path from 'path';
import { builder, Handler } from '@netlify/functions';
import operas from '../../operas.json';
import type {
  InfoBox,
  ListedOpera,
  OperaData,
  TitleHref,
} from '../../typings.js';

const myHandler: Handler = async () => {
  const operaList = await Promise.all(
    operas.map(
      async (opera) =>
        ({
          ...opera,
          titles: await getTitles(opera),
          language: await getLanguage(opera),
        } as ListedOpera)
    )
  );

  return {
    statusCode: 200,
    body: JSON.stringify(operaList),
  };
};

const handler = builder(myHandler);

export { handler };

import languages from '../../languages.json';

const wikiDir = '.';
export async function getInfoBox(opera: TitleHref): Promise<InfoBox | null> {
  const filename = path.join(
    wikiDir,
    decodeURIComponent(opera.titleHref),
    'infobox.json'
  );
  try {
    return JSON.parse(await fs.promises.readFile(filename, 'utf8'));
  } catch (e) {
    // not all operas have infoboxes
    return null;
  }
}

export async function getTitles(opera: OperaData): Promise<string[] | null> {
  const infobox = await getInfoBox(opera);
  const { 'Other title': otherTitle, Translation } = infobox || {};
  return [
    ...new Set([
      opera.title,
      ...(infobox?.titles || []),
      ...(otherTitle ? [otherTitle] : []),
      ...(Translation ? [Translation] : []),
    ]),
  ];
}

export async function getLanguage(opera: TitleHref): Promise<string | null> {
  for (const [lang, operaHrefs] of Object.entries(languages)) {
    if (operaHrefs.includes(decodeURIComponent(opera.titleHref))) return lang;
  }
  const infobox = await getInfoBox(opera);
  return infobox?.Language || null;
}
