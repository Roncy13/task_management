import { isObject } from "lodash";
import { Choices } from "../utils";
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

export function HlprCheckDirectory(component = '', type = Choices.Global, name='') {
  if (type === Choices.Global) {
    return `../../../src/services`
  }

  if (type === Choices.Default) {
    return HlprApiDirectory(name);
  }

  return HlprBaseDirectory(name)
}

export default {
  HlprApiDirectory,
  HlprBaseDirectory,
  HlprCheckDirectory,
}