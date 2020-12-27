import { GetConnection } from "@config/database";

export const GetConn = (schema: any) => GetConnection(schema).manager.getRepository(schema);