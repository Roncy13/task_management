import Cors from './app-settings/cors';
import { IAppUseSettings } from './../core/use.settings';
import SwaggerFn from './app-settings/swagger/index';

export default [
  {
    name: 'Cors Setup',
    use: Cors
  },
  {
    name: 'Swagger Api',
    use: SwaggerFn
  }
] as IAppUseSettings[];