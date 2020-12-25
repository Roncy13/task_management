import { NodePlopAPI } from 'plop';3
import { GenerateAction, GenerateComponent } from './../custom/actions/index';
import * as helpers from './helpers';
import * as api from './api';
import * as action from './action';

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

  // plop.setGenerator('Component', GenerateComponent);
  plop.setGenerator('Action', GenerateAction);

  await SetPlops([action], 'setActionType');
  await SetPlops([helpers, api], 'setHelper');
};