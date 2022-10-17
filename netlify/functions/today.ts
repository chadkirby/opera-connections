import { builder, Handler } from '@netlify/functions';
import seedrandom from 'seedrandom';
import { DateTime, Interval } from 'luxon';

import { getOperaList } from '../../utils/opera-list.js';
import { TargetOpera } from '@ckirby/opera-info';

const myHandler: Handler = async (event) => {
  const operas = await getOperaList();
  const params = new URLSearchParams(event.rawQuery);
  const todayISO = params.get('today') || DateTime.local().toISO();

  // set today to midnight of the current day PDT
  const today = DateTime.fromISO(todayISO, { zone: 'America/Los_Angeles' }).set(
    { hour: 0, minute: 0, second: 0 }
  );
  // the girls asked for plain-old random selections, so starting
  // 10/17/2022, just get a random index based on today's date string
  if (
    Interval.after(today, 0).isAfter(
      DateTime.fromObject({ year: 2022, month: 10, day: 16 })
    )
  ) {
    const rng = seedrandom(today.toLocaleString(DateTime.DATETIME_MED));
    const targetIndex = (rng() * operas.length) | 0;
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
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, must-revalidate',
        Vary: '*',
      },
    };
  } else {
    // use the old-style random number generator
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
    const daysSinceOrigin = Interval.fromDateTimes(origin, today).count('days');
    console.error({
      today: today.toLocaleString(DateTime.DATETIME_MED),
      origin: origin.toLocaleString(DateTime.DATETIME_MED),
      daysSinceOrigin,
    });
    let targetIndex = 0;
    const rng = seedrandom('shuffle-operas-1');
    for (let d = 0; d < daysSinceOrigin; d++) {
      targetIndex = (rng() * operas.length) | 0;
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
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, must-revalidate',
        Vary: '*',
      },
    };
  }
};

const handler = builder(myHandler);

export { handler };
