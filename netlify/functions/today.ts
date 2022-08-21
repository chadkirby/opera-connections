import { builder, Handler } from '@netlify/functions';
import seedrandom from 'seedrandom';
import { DateTime, Interval } from 'luxon';

import { getOperaList } from '../../utils/opera-list.js';
import { TargetOpera } from '@ckirby/opera-info';

const myHandler: Handler = async (event) => {
  const operas = await getOperaList();
  const params = new URLSearchParams(event.rawQuery);

  // using luxon, set the origin to midnight July 30, 2022 PDT
  const origin = DateTime.fromObject(
    {
      year: 2022,
      month: 7,
      day: 30,
      hour: 0,
      minute: 0,
      second: 0,
    },
    {
      zone: 'America/Los_Angeles',
    }
  );
  // set today to midnight of the current day PDT
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
  const daysSinceOrigin = Interval.fromDateTimes(origin, today).count('days');
  console.error({
    today: today.toLocaleString(DateTime.DATETIME_MED),
    origin: origin.toLocaleString(DateTime.DATETIME_MED),
    daysSinceOrigin,
  });
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
    body: JSON.stringify({
      ...targetOpera,
      today: today.toISO(),
    } as TargetOpera & {
      today: string;
    }),
    headers: {
      'Cache-Control': 'no-store, must-revalidate',
      Vary: '*',
    },
  };
};

const handler = builder(myHandler);

export { handler };
