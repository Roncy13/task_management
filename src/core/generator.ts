import {NodePlopAPI} from 'plop';
import path from 'path';

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
      path: '{{apiDirectory name}}/{{name}}.actions.ts',
      templateFile: '{{baseDirectory}}/smurf-templates/action.smurf'
    }
  ]
};

export default function (plop: NodePlopAPI) {

  /*plop.addHelper('absPath', function (p) {
		return path.resolve(plop.getPlopfilePath(), p);
  });*/

  plop.setHelper('apiDirectory', function (text) {
    console.log({ text });
		return `../api/${text}`;
  });
  
  plop.setHelper('baseDirectory', function () {
    return '../..';
	});

  plop.setGenerator('Api Component', apiComponent);
  plop.setGenerator('Action', action);
};