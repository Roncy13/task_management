import { StrTitleCase } from './../helpers/strings';

export function ApiChangeApiData(name: string) {
  return `Index Api for ${name}`;
}

export function ApiChangeIndexApiName(name: string) {
  const title = StrTitleCase(name);
  
  return `${title}Api`;
}

export function ApiFileName(name: string) {
  return name;
}

export default {
  ApiFileName,
  ApiChangeApiData,
  ApiChangeIndexApiName
}