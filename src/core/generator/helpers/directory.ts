import { isObject } from "lodash";
import { Choices } from "../utils";
import { DashCase } from "./strings";

export function HlprApiDirectory(name: string) {
  const basePath = HlprBaseDirectory();

  return `${basePath}/src/api/${DashCase(name)}`;
}

export function HlprBaseDirectory(folder: object | string ='') {
  if (isObject(folder)) {
    return '../../..'
  }
  return `../../..${folder}`
}

export function HlprCheckDirectory(component = '', type = Choices.Global, name='', location = '') {
  if (type === Choices.Global) {
    return `../../../src/services`
  }
  const apiDirectory = HlprApiDirectory(type === Choices.Default ? name : location);
  console.log({ name, location });
  console.log({ apiDirectory });

  return apiDirectory;
}

export default {
  HlprApiDirectory,
  HlprBaseDirectory,
  HlprCheckDirectory,
}