import { builder, Handler } from '@netlify/functions';
import seedrandom from 'seedrandom';

import operas from '../../operas.json';
import type { TargetOpera } from '../../typings.js';
import {
  getComposerSummary,
  getInfoBox,
  getRecordings,
  getRoles,
  getSummary,
} from '../../utils/opera-utils.js';
const rng = seedrandom('shuffle-operas-1');

const shuffled = operas.sort(() => rng() - 0.5);

const myHandler: Handler = async () => {
  const origin = new Date('2022-07-31T08:00:00');
  const today = new Date();
  today.setUTCHours(8, 0, 0, 0); // last midnight, GMT+8
  const daysSinceOrigin = Math.floor(
    (today.getTime() - origin.getTime()) / 86400000
  );

  const targetIndex = daysSinceOrigin % operas.length;
  const targetOpera = shuffled[targetIndex];
  console.log(`Target opera: ${targetOpera.title}`);

  const composerSummary = await getComposerSummary(targetOpera);

  return {
    statusCode: 200,
    body: JSON.stringify({
      ...targetOpera,
      thumbnailUrl: composerSummary?.thumbnail.source,
      composerSummary: composerSummary || {},
      infobox: (await getInfoBox(targetOpera)) || {},
      operaSummary: (await getSummary(targetOpera)) || {},
      recordings: (await getRecordings(targetOpera))?.items || [],
      roles: (await getRoles(targetOpera))?.items || [],
    } as TargetOpera),
  };
};

const handler = builder(myHandler);

export { handler };
