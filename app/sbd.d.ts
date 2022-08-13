// Type definitions for sbd 1.0
// Project: https://github.com/tessmore/sbd
// Definitions by: Brian Cort <https://github.com/thatcort>, Caroline Artz <https://github.com/carolineartz>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

interface Options {
  newline_boundaries?: boolean | undefined;
  html_boundaries?: boolean | undefined;
  html_boundaries_tags?: string[] | undefined;
  sanitize?: boolean | undefined;
  allowed_tags?: false | string[] | undefined;
  preserve_whitespace?: boolean | undefined;
  abbreviations?: string[] | undefined;
}

declare module '@ckirby/sbd' {
  const sentences: (text: string, options?: Options) => string[];
  const xprt: { sentences: typeof sentences };
  export default xprt;
}
