import Cors from './app-settings/cors';
import Database from './app-settings/database';
import { IAppUseSettings } from './../core/use.settings';

export default [
  {
    name: 'Cors Setup',
    use: Cors
  },
  {
    name: 'Database Setup',
    use: Database
  },
] as IAppUseSettings[];