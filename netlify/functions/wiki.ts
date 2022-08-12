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

const myHandler: Handler = async (event) => {
  const params = new URLSearchParams(event.rawQuery);
  console.error(event);

  const href = decodeURIComponent(params.get('href')!);
  console.error({ href });
  const targetOpera = operas.find((o) => o.titleHref.slice(1) === href);
  if (!targetOpera) {
    return {
      statusCode: 404,
      body: 'Not found',
    };
  }
  console.log(`Target opera: ${targetOpera.title}`);

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
