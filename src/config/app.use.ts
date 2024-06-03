import Cors from './app-settings/cors';
import Database from './app-settings/database';
import Migrations from './app-settings/migrations';

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
  {
    name: 'Migrations records',
    use: Migrations
  }
] as IAppUseSettings[];