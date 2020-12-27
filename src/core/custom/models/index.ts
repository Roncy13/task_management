import { apiPathComponent, DirectoryType } from "../../generator/utils";
import { RunDirectoryModel } from './../../generator/utils/globals';

export const AskDirectoryTypeForModel = DirectoryType('Model');

export const GenerateModel = {
  description: 'Generator For Creating Typeorm Model, Smurf',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name of Model you want to create.'
    },
    AskDirectoryTypeForModel,
  ],
  actions: [
    RunDirectoryModel,
    {
      type: 'setComponent',
      component: 'models',
      extension: 'entity'
    },
    {
      type: 'add',
      path: apiPathComponent,
      templateFile: '{{HlprBaseDirectory }}/smurf-templates/model.smurf'
    },
    {
      type: 'modify',
      path: apiPathComponent,
      pattern: /ModelName/gi,
      template: '{{RunDirectoryModel name}}'
    },
  ]
}

export default {
  GenerateModel,
  AskDirectoryTypeForModel,
}