import type { TargetOpera } from '../typings.js';

export function getTitles(opera: TargetOpera) {
  const { infobox } = opera;
  const { 'Other title': otherTitle, Translation } = infobox || {};
  return [
    ...new Set([
      opera.title,
      ...(infobox?.titles || []),
      ...(otherTitle ? [otherTitle] : []),
      ...(Translation ? [Translation] : []),
    ]),
  ];
}
