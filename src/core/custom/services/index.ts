import { DirectoryType } from "../../generator/utils";

export const AskDirectoryTypeForService = DirectoryType('Services');

export const GenerateService = {
  description: 'Generator For Creating Service, Smurf',
  prompts: [
    [
      {
        type: 'input',
        name: 'name',
        message: 'Name of Service you want to create.'
      },
      AskDirectoryTypeForService,
    ]
  ],
  actions: [
    AskDirectoryTypeForService
  ]
}