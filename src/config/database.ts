import { ConnectionOptions, createConnection, getRepository, Entity, getConnection } from 'typeorm';
import ormconfig from '@base/ormconfig';

export const GetConnection = (entity: any) => getRepository(entity);
export default () => createConnection(ormconfig as ConnectionOptions);
