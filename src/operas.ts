import seedrandom from 'seedrandom';
import rawOperas from './raw-operas';

export interface OperaData {
  titles: string[];
  normalizedTitles: string[];
  composer: string;
  date: string;
  language: string;
  operaHints: string[];
  composerHints: string[];
  thumbnail: { source: string; width: number; height: number };
}

const rng = seedrandom('shuffle-operas-1');

export default rawOperas
  .map<OperaData>((opera) => ({
    ...opera,
    normalizedTitles: opera.titles.map(normalize),
  }))
  .sort(() => rng() - 0.5);

export function normalize(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s/g, ' ')
    .replace(/[^\w\s]/g, '_')
    .trim();
}
