import { apiPathComponent, DirectoryType } from "../../generator/utils";
import { RunDirectoryService } from './../../generator/utils/globals';

export const AskDirectoryTypeForService = DirectoryType('Services');

export const GenerateService = {
  description: 'Generator For Creating Service, Smurf',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name of Service you want to create.'
    },
    AskDirectoryTypeForService,
  ],
  actions: [
    RunDirectoryService,
    {
      type: 'setComponent',
      component: 'service'
    },
    {
      type: 'add',
      path: apiPathComponent,
      templateFile: '{{HlprBaseDirectory }}/smurf-templates/service.smurf'
    },
    {
      type: 'modify',
      path: apiPathComponent,
      pattern: /ModelAllSrv/gi,
      template: '{{ServiceChangeModelAll name}}'
    },
  ]
}

export default {
  GenerateService,
  AskDirectoryTypeForService,
}