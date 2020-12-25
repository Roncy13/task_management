import { isObject } from "lodash";
import { DashCase } from "./strings";

export function HlprApiDirectory(name: string) {
  const basePath = HlprBaseDirectory();

  return `${basePath}/src/api/${DashCase(name)}`;
}

export function HlprBaseDirectory(folder='') {
  if (isObject(folder)) {
    return '../../..'
  }
  return `../../..${folder}`
}

export default {
  HlprApiDirectory,
  HlprBaseDirectory,
}