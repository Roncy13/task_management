import {NodePlopAPI} from 'plop';
import { toLower, startCase } from 'lodash';

const choices = ["GLOBAL", "Api Directory"];
const DirectoryType = () => ({
  name: 'Directory Type',
  type: 'list',
  choices,
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
const actionPath = '{{apiDirectory name}}/{{name}}.actions.ts';
const action: any =  {
  description: 'Generator For Creating API Component, Smurf.',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name of Action you want to create.'
    },
  ],
  actions: [
    {
      type: 'add',
      path: actionPath,
      templateFile: '{{baseDirectory}}/smurf-templates/action.smurf'
    },
    {
      type: 'modify',
      path: actionPath,
      pattern: /SmurfApi/i,
      template: '{{changeIndexApiName name}}'
    },
    {
      type: 'modify',
      path: actionPath,
      pattern: /Smurf Api Data/i,
      template: '{{changeActionData name}}'
    }
  ]
};

function PascalNameCase (answers: any, config: any, plop: any) {
  return 'Upper case name config';
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
  plop.setActionType('pascalNameCase', PascalNameCase)
  plop.setHelper('apiDirectory', ApiDirectory);
  plop.setHelper('baseDirectory', BaseDirectory);

  
  plop.setHelper('changeIndexApiName', ChangeIndexApiName);
  plop.setHelper('changeActionData', ChangeActionData);

  plop.setGenerator('Api Component', apiComponent);
  plop.setGenerator('Action', action);
};