import { Choices, DirectoryTypeFor, RunPathDirectoryForAction } from "../../generator/utils";

export const apiPath = '{{HlprApiDirectory location}}/{{DashCase name}}.actions.ts';

export const AskDirectoryTypeForActions = DirectoryTypeFor('Actions');

export const CheckIfNameIsDirectory = () => ({
  name: 'directory',
  type: 'input',
  message: 'Input Directory Folder',
  when: (answer: any) => {
    return answer.type === Choices.Directory;
  },
})

export const GenerateAction =  {
  description: 'Generator For Creating API Component, Smurf.',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name of Action you want to create.'
    },
    AskDirectoryTypeForActions,
    CheckIfNameIsDirectory(),
  ],
  actions: [
    RunPathDirectoryForAction(),
    {
      type: 'add',
      path: apiPath,
      templateFile: '{{HlprBaseDirectory }}/smurf-templates/action.smurf'
    },
    {
      type: 'modify',
      path: apiPath,
      pattern: /SmurfApi/i,
      template: '{{ApiChangeIndexApiName name}}'
    },
    {
      type: 'modify',
      path: apiPath,
      pattern: /Smurf Api Data/i,
      template: '{{ApiChangeApiData name}}'
    },
    {
      type: 'modify',
      path: apiPath,
      pattern: /custom-end-point/i,
      template: '{{ApiFileName name}}'
    }
  ]
};

export default {
  apiPath,
  DirectoryTypeForActions: AskDirectoryTypeForActions,
  GenerateAction,
};