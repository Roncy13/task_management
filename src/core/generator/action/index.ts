import { HlprApiDirectory } from "../helpers";

export function pathDirectoryForAction(answers: any, config: any, plop: any) {
  answers.location = answers.directory || answers.name;
  config.pathDirectory = HlprApiDirectory(answers.location);

  return `Path directory is ${answers.type}`;
}

export default {
  pathDirectoryForAction,
}