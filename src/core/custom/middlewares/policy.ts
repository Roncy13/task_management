import { apiPathComponent, DirectoryType } from "../../generator/utils";
import { CheckIfNameIsDirectory, RunDirectoryPolicy } from './../../generator/utils/globals';

export const AskDirectoryTypeForPolicy = DirectoryType('Policy');

export const GeneratePolicy = {
  description: 'Generator For Creating Typeorm Policy, Smurf',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name of Policy you want to create.'
    },
    AskDirectoryTypeForPolicy,
    CheckIfNameIsDirectory(),
  ],
  actions: [
    RunDirectoryPolicy,
    {
      type: 'setComponent',
      component: 'policy',
    },
    {
      type: 'add',
      path: apiPathComponent,
      templateFile: '{{HlprBaseDirectory }}/smurf-templates/Policy.smurf'
    },
    {
      type: 'modify',
      path: apiPathComponent,
      pattern: /smurfPolicy/gi,
      template: '{{PolicyChangeName name}}'
    },
  ]
}

export default {
  GeneratePolicy,
  AskDirectoryTypeForPolicy,
}