import { builder, Handler } from '@netlify/functions';
import operas from '../../operas.json';
import type { ListedOpera } from '../../typings.js';
import { getTitles, getLanguage } from '../../utils/opera-utils.js';

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
