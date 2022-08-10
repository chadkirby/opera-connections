import fs from 'fs';
import fetch from 'node-fetch';

let operas = JSON.parse(fs.readFileSync('./opera-list.json', 'utf8'));

async function getThumbs() {
  for (const { thumbnail } of operas) {
    if (thumbnail) {
      const response = await fetch(thumbnail.source);
      const buffer = Buffer.from(await response.arrayBuffer());
      let name = thumbnail.source.split('/').pop();
      fs.writeFileSync(`./static/${name}`, buffer);
      console.log(`${name} fetched`);
    }
  }
}

getThumbs();
