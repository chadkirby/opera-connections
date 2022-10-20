import { Handler } from '@netlify/functions';
import { getOperaList } from '../../utils/opera-list.js';

const handler: Handler = async () => {
  const operas = await getOperaList();
  const operaList = await Promise.all(
    operas.map((_, i) => operas.getBasicOpera(i))
  );

  return {
    statusCode: 200,
    body: JSON.stringify(operaList),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

export { handler };
