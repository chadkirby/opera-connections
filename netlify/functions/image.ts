import { builder, Handler } from '@netlify/functions';

const myHandler: Handler = async (event) => {
  const { URLSearchParams } = await import('url');
  const fetch = await import('node-fetch');
  const params = new URLSearchParams(event.rawQuery);

  if (params.get('url')) {
    const response = await fetch.default(
      decodeURIComponent(params.get('url')!),
      {
        method: 'GET',
        headers: new fetch.Headers({
          'User-Agent':
            process.env['USER_AGENT'] || 'OperadleBot/1.0 (operadle@ckky.net)',
        }),
      }
    );

    return {
      statusCode: 200,
      body: Buffer.from(await response.arrayBuffer()).toString('base64'),
      headers: { 'content-type': response.headers.get('content-type')! },
      isBase64Encoded: true,
    };
  }
  return {
    statusCode: 400,
    body: JSON.stringify({ message: 'No url provided' }),
  };
};

const handler = builder(myHandler);

export { handler };
