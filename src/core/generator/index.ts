import { ActionConfig, NodePlopAPI } from 'plop';3
import { CamelCase } from './helpers';
import * as helpers from './helpers';
import * as api from './api';
import * as action from './action';

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

const generateComponent: any = {
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
      base: 'src/api/',
      destination: '{{name}}',
      templateFiles: '../../smurf-templates/*'
    }
  ]
};

const apiPath = '{{HlprApiDirectory name}}/{{DashCase name}}.actions.ts';
const generateAction: any =  {
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

export default async function (plop: NodePlopAPI | any) {
  async function SetPlops(values: Array<Object>, plopType: string) {
    await values.forEach(async (r) => {
      const func = r as any;
      const keys = Object.keys(r).filter(f => f !== 'default');

      await Promise.all(keys.map(index => {
        plop[`${plopType}`](index, func[index]);
      }));
    });
  }

  plop.setGenerator('Component', generateComponent);
  plop.setGenerator('Action', generateAction);

  await SetPlops([action], 'setActionType');
  await SetPlops([helpers, api], 'setHelper');
};