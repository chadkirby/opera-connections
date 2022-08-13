import { builder, Handler } from '@netlify/functions';
import { getOperaList } from '../../utils/opera-list.js';

const myHandler: Handler = async (event) => {
  const params = new URLSearchParams(event.rawQuery);
  console.error(event);

  const href = decodeURIComponent(params.get('href')!);
  console.error({ href });
  const operas = await getOperaList();
  const targetIndex = operas.findIndex((o) => o.titleHref.slice(1) === href);
  if (targetIndex < 0) {
    return {
      statusCode: 404,
      body: 'Not found',
    };
  }
  const targetOpera = await operas.getTargetOpera(targetIndex);

  return {
    statusCode: 200,
    body: JSON.stringify(targetOpera),
  };
};

const handler = builder(myHandler);

export { handler };
