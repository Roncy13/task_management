import { Choices } from "../../generator/utils";
import { ActionConfig } from "plop";

export const apiPath = '{{HlprApiDirectory name}}/{{DashCase name}}.actions.ts';

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

export const GenerateComponent: any = {
  description: 'Generator For Creating API Component, Smurf.',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name of Api Component you want to create.'
    },
    DirectoryTypeForActions(),
  ],
  actions: [
    {
      type: 'addMany',
      base: 'src/api/',
      destination: '{{name}}',
      templateFiles: '../../smurf-templates/*'
    }
  ]
};

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
  actions: ({ type }: ActionConfig) => {
    const path = type === Choices.Default ? `{{HlprApiDirectory name}}/{{DashCase name}}.actions.ts` : apiPath;
    const actions = [
      {
        type: 'pathDirectory',
      },
      {
        type: 'add',
        path,
        templateFile: '{{HlprBaseDirectory}}/smurf-templates/action.smurf'
      },
      {
        type: 'modify',
        path,
        pattern: /SmurfApi/i,
        template: '{{ApiChangeIndexApiName name}}'
      },
      {
        type: 'modify',
        path,
        pattern: /Smurf Api Data/i,
        template: '{{ApiChangeApiData name}}'
      },
      {
        type: 'modify',
        path,
        pattern: /custom-end-point/i,
        template: '{{ApiFileName name}}'
      }
    ];
    return actions;
  }
};

export default {
  apiPath,
  DirectoryType,
  DirectoryTypeForActions,
  GenerateAction,
  GenerateComponent
};