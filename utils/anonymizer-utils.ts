import { getTitles } from './opera-utils.js';

export async function anonymize(target: string, opera) {
  let anonymized = target;
  const titles = await getTitles(opera);
  if (titles) anonymized = anonymizeTitle(titles, anonymized);
  anonymized = anonymizeComposer(opera.composer, anonymized);
  return anonymized;
}

export function anonymizeComposer(composer: string, target: string): string {
  const names = composer.split(/s+/);
  const last = names.pop();
  const optional = names.map((n) => `(?:${n}\s+)?`).join('');
  const composerPattern = new RegExp(`\\b${optional}(?:${last})\\b`, 'g');
  target = target.replace(composerPattern, 'the composer');
  target = target.replace(/(?<=\bthe composer)'s?(?!\w)/, "'s");
  target = capitalize(target, 'the composer');
  return target;
}

export function anonymizeTitle(titles: string[], target: string): string {
  const patterns = titles.map((title) => {
    const [first, ...rest] = title.split(/ /);
    return `(?:\\b${first}(?:${rest.join(' ')})?\\b)`;
  });
  const composerPattern = RegExp(patterns.join('|'), 'g');
  target = target.replace(composerPattern, 'this opera');
  target = target.replace(/(?<=\bthis opera)'s?(?!\w)/, "'s");
  target = capitalize(target, 'this opera');
  return target;
}

export function capitalize(source: string, target: string): string {
  const [first, ...rest] = target.split('');
  return source.replace(
    new RegExp(`(?<=\\.\\s+|^)t${first}(?=${rest.join('')})`, 'g'),
    first.toUpperCase()
  );
}
