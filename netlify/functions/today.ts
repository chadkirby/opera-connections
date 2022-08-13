import { builder, Handler } from '@netlify/functions';
import seedrandom from 'seedrandom';

import { getOperaList } from '../../utils/opera-list.js';

const myHandler: Handler = async (event) => {
  const operas = await getOperaList();
  const params = new URLSearchParams(event.rawQuery);

  const origin = new Date('2022-07-30T08:00:00');
  const today = new Date();
  today.setUTCHours(8, 0, 0, 0); // last midnight, GMT+8
  const daysSinceOrigin = Math.floor(
    (today.getTime() - origin.getTime()) / 86400000
  );
  let targetIndex = (Math.random() * operas.length) | 0;
  if (!params.get('random')) {
    const rng = seedrandom('shuffle-operas-1');
    for (let d = 0; d < daysSinceOrigin; d++) {
      targetIndex = (rng() * operas.length) | 0;
    }
  }

  const targetOpera = await operas.getTargetOpera(targetIndex);

  return {
    statusCode: 200,
    body: JSON.stringify(targetOpera),
  };
};

const handler = builder(myHandler);

export { handler };
