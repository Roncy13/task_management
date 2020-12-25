import { startCase, toLower, camelCase  } from 'lodash';

export function StrTitleCase(text: string) {
  return startCase(toLower(text)).replace(/ /gi, '');
}

export function CamelCase(text: string) {
  return camelCase(text);
}

export default {
  StrTitleCase
}