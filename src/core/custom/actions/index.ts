import { Choices } from "../../generator/utils";

const RunPathDirectory = () => ({
  type: 'pathDirectory',
});

export const apiPath = '{{HlprApiDirectory location}}/{{DashCase name}}.actions.ts';

export const DirectoryType = (type = '') => ({
  name: 'type',
  type: 'list',
  choices: Object.values(Choices),
  message: 'Please Choose what directory type'
});

export const DirectoryTypeForActions = () => ({
  name: 'type',
  type: 'list',
  choices: Object.values(Choices).filter(f => f !== Choices.Global),
  message: 'Please Choose what directory type'
});

export const CheckIfNameIsDirectory = () => ({
  name: 'directory',
  type: 'input',
  message: 'Input Directory Folder',
  when: (answer: any) => {
    return answer.type === Choices.Directory;
  },
})

export const GenerateAction: any =  {
  description: 'Generator For Creating API Component, Smurf.',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name of Action you want to create.'
    },
    DirectoryTypeForActions(),
    CheckIfNameIsDirectory(),
  ],
  actions: [
    RunPathDirectory(),
    {
      type: 'add',
      path: apiPath,
      templateFile: '{{HlprBaseDirectory}}/smurf-templates/action.smurf'
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
  DirectoryType,
  DirectoryTypeForActions,
  GenerateAction,
};