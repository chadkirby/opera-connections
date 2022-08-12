import fs from 'fs';
import path from 'path';
import { builder, Handler } from '@netlify/functions';
import seedrandom from 'seedrandom';

import operas from '../../operas.json';
import type {
  ComposerSummary,
  InfoBox,
  OperaSummary,
  RecordingData,
  RoleData,
  TargetOpera,
  TitleHref,
} from '../../typings.js';
const rng = seedrandom('shuffle-operas-1');

const skipComposers = [
  'Henze',
  'Tippett',
  'Henze',
  'Bernd Alois Zimmermann',
  'Walton',
  'Harrison Birtwistle',
  'Krzysztof Penderecki',
  'Michael Tippett',
  'Peter Maxwell Davies',
  'Ligeti',
  'Aribert Reimann',
  'Davies',
  'Olivier Messiaen',
  'Luciano Berio',
  'Birtwistle',
  'Judith Weir',
  'Birtwistle',
  'André Previn',
  'Caccini',
  'Heinrich Schütz',
  'Juan Hidalgo',
  'Robert Cambert',
  'Blow',
  'Manuel de Zumaya',
  'Francesco Araja',
];
const shuffled = operas
  .filter((o) => o.composerHref && o.titleHref)
  .filter((o) => !skipComposers.includes(o.composer))
  .sort(() => rng() - 0.5);

const myHandler: Handler = async (event) => {
  const params = new URLSearchParams(event.rawQuery);

  const origin = new Date('2022-07-30T08:00:00');
  const today = new Date();
  today.setUTCHours(8, 0, 0, 0); // last midnight, GMT+8
  const daysSinceOrigin = Math.floor(
    (today.getTime() - origin.getTime()) / 86400000
  );

  const targetIndex = params.get('random')
    ? (Math.random() * shuffled.length) | 0
    : daysSinceOrigin % operas.length;
  const targetOpera = shuffled[targetIndex];

  const composerSummary = await getComposerSummary(targetOpera);
  const otherOperaTitles = operas
    .filter((o) => o.composerHref === targetOpera.composerHref)
    .map((o) => o.title);

  return {
    statusCode: 200,
    body: JSON.stringify({
      ...targetOpera,
      composer: composerSummary?.title,
      thumbnailUrl: composerSummary?.thumbnail.source,
      composerSummary: composerSummary || {},
      infobox: (await getInfoBox(targetOpera)) || {},
      operaSummary: (await getSummary(targetOpera)) || {},
      recordings: (await getRecordings(targetOpera))?.items || [],
      roles: (await getRoles(targetOpera))?.items || [],
      otherOperaTitles,
    } as TargetOpera),
  };
};

const handler = builder(myHandler);

export { handler };

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

export async function getRecordings(
  opera: TitleHref
): Promise<RecordingData | null> {
  const filename = path.join(
    wikiDir,
    decodeURIComponent(opera.titleHref),
    'recordings.json'
  );
  try {
    return JSON.parse(await fs.promises.readFile(filename, 'utf8'));
  } catch (e) {
    // not all operas have recordings
    return null;
  }
}

export async function getRoles(opera: TitleHref): Promise<RoleData | null> {
  const filename = path.join(
    wikiDir,
    decodeURIComponent(opera.titleHref),
    'roles.json'
  );
  try {
    return JSON.parse(await fs.promises.readFile(filename, 'utf8'));
  } catch (e) {
    // not all operas have roles
    return null;
  }
}

export async function getSummary(
  opera: TitleHref
): Promise<OperaSummary | null> {
  const filename = path.join(
    wikiDir,
    decodeURIComponent(opera.titleHref),
    'summary.json'
  );
  try {
    return JSON.parse(await fs.promises.readFile(filename, 'utf8'));
  } catch (e) {
    return null;
  }
}

export async function getComposerSummary(
  opera: TitleHref
): Promise<ComposerSummary | null> {
  if (!opera.composerHref) return null;
  try {
    const filename = path.join(
      wikiDir,
      decodeURIComponent(opera.composerHref),
      'summary.json'
    );
    return JSON.parse(await fs.promises.readFile(filename, 'utf8'));
  } catch (e) {
    return null;
  }
}
