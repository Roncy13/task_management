import {ActionConfig, NodePlopAPI} from 'plop';
import { toLower, startCase } from 'lodash';

const Choices = {
  Global: 'Global',
  Directory: 'Directory',
  Default: 'Default'
};
const DirectoryType = () => ({
  name: 'type',
  type: 'list',
  choices: Object.values(Choices),
  message: 'Please Choose what directory type'
});

const apiComponent: any = {
  description: 'Generator For Creating API Component, Smurf.',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name of Api Component you want to create.'
    },
    DirectoryType()
  ],
  actions: [
    {
      type: 'addMany',
      //des: 'src/{{name}}/{{name}}.actions.ts',
      //templateFile: 'smurf-templates/actions.smurf'
      base: 'src/api/',
      destination: '{{name}}',
      templateFiles: '../../smurf-templates/*'
    }
  ]
};
const apiPath = '{{apiDirectory name}}/{{name}}.actions.ts';
const action: any =  {
  description: 'Generator For Creating API Component, Smurf.',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name of Action you want to create.'
    },
    DirectoryType()
  ],
  actions: ({ type }: ActionConfig) => {
    const path = type === Choices.Default ? `{{apiDirectory name}}/{{name}}.actions.ts` : apiPath;
    const actions = [
      {
        type: 'pathDirectory',
        speed: 'slow',
      },
      {
        type: 'add',
        path,
        templateFile: '{{baseDirectory}}/smurf-templates/action.smurf'
      },
      {
        type: 'modify',
        path,
        pattern: /SmurfApi/i,
        template: '{{changeIndexApiName name}}'
      },
      {
        type: 'modify',
        path,
        pattern: /Smurf Api Data/i,
        template: '{{changeActionData name}}'
      }
    ];

    return actions;
  }
};

function PascalNameCase (answers: any, config: any, plop: any) {
  return 'Upper case name config';
}

function ChangePathDirectory (answers: any, config: any, plop: any) {
  const type = (answers.type).replace(/ /g, '');
  answers.type = type;
  return 'Change Path directory';
}

function PathDirectory (answers: any, config: any, plop: any) {
  config.pathDirectory = answers.type === Choices.Global ? BaseDirectory() : ApiDirectory(answers.name);

  return `Path directory is ${answers.type}`;
}

function CheckConfigPath (answers: any, config: any, plop: any) {
  console.log({ answers });
  return 'Path directory';
}

function TitleCase (text: string) {
  return startCase(toLower(text)).replace(/ /gi, '');
}

function ApiDirectory(name: string) {
  return `../api/${name}`;
}

function ChangeActionData(name: string) {
  return `Index Api for ${name}`;
}

function ChangeIndexApiName(name: string) {
  const title = TitleCase(name);
  
  return `${title}Api`;
}

function BaseDirectory() {
  return '../../';
}

export default function (plop: NodePlopAPI) {
  plop.setActionType('pascalNameCase', PascalNameCase);
  plop.setActionType('pathDirectory', PathDirectory);
  plop.setActionType('checkConfigPath', CheckConfigPath);

  plop.setHelper('apiDirectory', ApiDirectory);
  plop.setHelper('baseDirectory', BaseDirectory);
  plop.setHelper('changeIndexApiName', ChangeIndexApiName);
  plop.setHelper('changeActionData', ChangeActionData);

  plop.setGenerator('Api Component', apiComponent);
  plop.setGenerator('Action', action);
};