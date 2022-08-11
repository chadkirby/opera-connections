import fs from 'fs';
import path from 'path';
import type {
  ComposerSummary,
  InfoBox,
  OperaData,
  OperaSummary,
  RecordingData,
  RoleData,
} from '../typings.js';

import languages from '../languages.json';

export interface TitleHref extends Partial<OperaData> {
  titleHref: string;
}

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
