import { HlprBaseDirectory, HlprApiDirectory } from "../helpers";
import { Choices } from "../utils";

export function pathDirectory (answers: any, config: any, plop: any) {
  answers.location = answers.directory || answers.name;
  config.pathDirectory = answers.type === Choices.Global ? HlprBaseDirectory() : HlprApiDirectory(answers.location);

  return `Path directory is ${answers.type}`;
}

export default {
  pathDirectory,
}