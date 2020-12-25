export function HlprApiDirectory(name: string) {
  const basePath = HlprBaseDirectory();

  return `${basePath}/src/api/${name}`;
}

export function HlprBaseDirectory() {
  return '../../..'
}

export default {
  HlprApiDirectory,
  HlprBaseDirectory,
}