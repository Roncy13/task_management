import { DashCase } from "./strings";

export function HlprApiDirectory(name: string) {
  const basePath = HlprBaseDirectory();

  return `${basePath}/src/api/${DashCase(name)}`;
}

export function HlprBaseDirectory() {
  return '../../..'
}

export default {
  HlprApiDirectory,
  HlprBaseDirectory,
}