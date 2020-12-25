import { HlprBaseDirectory, HlprApiDirectory } from "../helpers";
import { Choices } from "../utils";

export function pathDirectory (answers: any, config: any, plop: any) {
  config.pathDirectory = answers.type === Choices.Global ? HlprBaseDirectory() : HlprApiDirectory(answers.name);

  return `Path directory is ${answers.type}`;
}

export default {
  pathDirectory,
}