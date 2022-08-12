import sbd from 'sbd';
import { listString } from '@ckirby/mr-lister';
import type { TargetOpera } from '../typings.js';
import { anonymize } from './anonymizer.js';

export function makeHints(opera: TargetOpera): string[] {
  const composerHints = makeComposerHints(opera);
  const recordingHints = makeRecordingHints(opera);
  const rolesHints = makeRolesHints(opera);
  const extractHints = makeExtractHints(opera);
  const hints = [anonymize(opera.factoid, opera)];
  while (
    composerHints.length +
      recordingHints.length +
      rolesHints.length +
      extractHints.length >
    0
  ) {
    if (composerHints.length) hints.push(composerHints.shift()!);
    if (recordingHints.length) hints.push(recordingHints.shift()!);
    if (extractHints.length) hints.push(extractHints.shift()!);
    if (rolesHints.length) hints.push(rolesHints.pop()!);
  }
  return hints.filter((h) => h && !/Cav\/Pag/.test(h));
}

function makeRecordingHints({ recordings }: TargetOpera): string[] {
  return recordings.map(
    ({ year, cast, conductor }) =>
      `${conductor} conducted a ${year} recording of this opera that featured ${listString(
        cast
      )}.`
  );
}

function makeRolesHints({ roles }: TargetOpera): string[] {
  return roles
    .filter((r) => r.voiceType)
    .map(
      ({ role, voiceType }) =>
        `In this opera, the role ${
          /,/.test(role) ? `${role},` : role
        } is performed by a ${voiceType}.`
    );
}

function makeComposerHints(opera: TargetOpera): string[] {
  const div = document.createElement('div');
  div.innerHTML = opera.composerSummary.extract_html;
  for (const b of Array.from(div.querySelectorAll('b'))) {
    b.textContent = 'the composer';
  }
  const extract = anonymize(getText(div), opera);
  const sentences = sbd.sentences(capitalize(extract, 'the composer'), {
    newline_boundaries: true,
  });
  return sentences;
}

function makeExtractHints(opera: TargetOpera): string[] {
  const div = document.createElement('div');
  div.innerHTML = opera.operaSummary.extract_html;
  for (const b of Array.from(div.querySelectorAll('b'))) {
    b.textContent = 'this opera';
  }
  const extract = anonymize(getText(div), opera);
  const sentences = sbd.sentences(capitalize(extract, 'this opera'), {
    newline_boundaries: true,
  });
  return sentences;
}

function getText(el: Element): string {
  let val = '';
  if (el?.childNodes) {
    for (const node of Array.from(el.childNodes)) {
      if (isText(node)) {
        val += node.textContent?.replace(/\s+/g, ' ');
      } else if (isEl(node)) {
        if (node.nodeName.toLowerCase() === 'br') {
          val += '\n';
        } else if (node.matches('sup.reference')) {
          // skip footnote references
        } else {
          val += getText(node);
        }
      }
    }
  }
  return val.trim();
}

function isText(node: Node): node is Text {
  return node.nodeType === node.ownerDocument?.TEXT_NODE;
}

function isEl(node: Node): node is Element {
  return node.nodeType === node.ownerDocument?.ELEMENT_NODE;
}

export function capitalize(source: string, target: string) {
  const [first, ...rest] = target.split('');
  return source.replace(
    RegExp(`(?<=\\.\\s+|^)${first}(?=${rest.join('')})`, 'g'),
    first.toUpperCase()
  );
}
