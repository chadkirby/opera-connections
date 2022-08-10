import fs from 'fs';
import nlp from 'compromise';
import re from '@ckirby/block-re';

const summaries = JSON.parse(fs.readFileSync('opera-summaries.json', 'utf8'));

const operas = [];

const languagePattern =
  /\b(?:'Czech|English|French|German|Hungarian|Italian|Russian|Spanish')/;

for (const { opera, infoBox, operaSummary, composerSummary } of summaries) {
  try {
    const { title, titleHref, composer, composerHref, date } = opera;
    const { content_urls } = opera;

    if (/\bop.rett[ea]\b/.test(operaSummary.extract)) continue;

    const composerNames = [
      opera.composer,
      composerSummary.title,
      composerSummary.title.split(' ').pop(),
    ];
    const composerPattern = re`/\b(?:${composerNames.join('|')})\b/g`;
    const titlePattern = infoBox.titles
      ? re`/\b(?:${title}|${infoBox.titles.join('|')})\b/g`
      : re`/\b(?:${title})\b/g`;

    const hints = [];
    for (const sentence of nlp(
      operaSummary.extract
        .replace(/, [Oo]p(?:[.]|us) \w+,?/g, '')
        .replace(/, K[.] \d+,?/g, '')
    )
      .sentences()
      .data()) {
      let { text } = sentence;
      text = text.replace(composerPattern, 'the composer');
      text = text.replace(/(?<!the first )\b(?:composed )?by the composer/, '');
      text = text.replace(/\bthe composer the composer\b/g, 'the composer');
      text = text.replace(
        /the ([A-Z]\w+) composer the composer(?!')/g,
        (match, adjective) =>
          /^[aeiou]/i.test(adjective)
            ? `an ${adjective} composer`
            : `a ${adjective} composer`
      );
      text = text.replace(
        /(?<!(?:the|an?) )\b([A-Z]\w+) composer the composer(?!')/g,
        (match, adjective) =>
          /^[aeiou]/i.test(adjective)
            ? `an ${adjective} composer`
            : `a ${adjective} composer`
      );
      text = text.replace(titlePattern, 'this opera');
      text = text.replace(/opera \([A-Z]\w+\)/g, 'opera');
      text = text.replace(/\bthis opera is (an op[eé]ra)\b/, 'this is $1');
      text = text.replace(
        /^[tT]his opera.* is (an? [-\w]+ op[eé]ra)/,
        'this is $1'
      );
      text = text.replace('the opera this opera', 'this opera');
      text = text.replace(/^t/, 'T');

      hints.push(
        text
          .replace(/\s+/g, ' ')
          .replace(/\s+(?=[,.])/, '')
          .trim()
      );
    }

    const composerHints = [];
    for (const sentence of nlp(composerSummary.extract).sentences().data()) {
      let { text } = sentence;
      text = text.replace(composerPattern, 'the composer');
      text = text.replace(
        /\b(?:[A-ZÀ-Ÿ]\S+[- ]+)+(?:von )?the composer/,
        'the composer'
      );
      text = text.replace(/\bthe composer the composer\b/g, 'the composer');
      // Britten
      text = text.replace('composer, Baron the composer', 'composer');
      // Mozart
      text = text.replace('composer, baptised as the composer,', 'composer');
      text = text.replace(titlePattern, 'this opera');
      text = text.replace(/^t/, 'T');
      text = text.replace(/^He\b/, 'The composer');

      composerHints.push(
        text
          .replace(/\s+/g, ' ')
          .replace(/\s+(?=[,.])/, '')
          .trim()
      );
    }

    let { Language: language = '' } = infoBox;
    if (!language) {
      let match = operaSummary.extract.match(languagePattern);
      if (match) {
        language = match[0];
      }
    }
    if (!language) {
      let match = operaSummary.extract.match(languagePattern);
      if (match) {
        language = match[0];
      }
    }
    if (!language) {
      switch (title) {
        case 'Orphée et Eurydice':
        case 'La belle Hélène':
          language = 'French';
          break;

        case 'Orfeo ed Euridice':
          language = 'Italian';
          break;
      }
    }

    if (!language) {
      switch (composer) {
        case 'Handel':
        case 'Britten':
        case 'Bernstein':
        case 'John Adams':
          language = 'English';
          break;

        case 'Glinka':
          language = 'Russian';
          break;

        default:
          console.error(`No language found for ${title} by ${composer}`);
      }
    }

    let thumbnail = operaSummary.thumbnail || {};

    let {
      'Other title': otherTitle,
      'Native title': nativeTitle,
      Translation,
    } = infoBox;
    let titles = infoBox.titles ? infoBox.titles.slice() : [];
    titles.unshift(title);
    if (otherTitle) titles.push(otherTitle);
    if (nativeTitle) titles.push(nativeTitle);
    if (Translation) titles.push(Translation);
    operas.push({
      titles: [...new Set(titles)],
      titleHref,
      composer,
      composerHref,
      composerThumbnail: composerSummary.thumbnail,
      date,
      language,
      operaHints: hints,
      composerHints,
      thumbnail,
      content_urls,
      infoBox,
    });
  } catch (error) {
    console.log(error);
  }
}

const shuffled = operas; //.sort(() => Math.random() - 0.5);

fs.writeFileSync('opera-list.json', JSON.stringify(shuffled, null, 2));
