import { db } from '@config/connection';
import { RunResult } from 'sqlite3';

export default async function database() {
   await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER not null primary key,
      name TEXT not null,
      email TEXT not null,
      password TEXT not null,
      role TEXT not null default 'user'
    )`,
  );

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER not null primary key,
      title TEXT not null,
      description TEXT not null,
      status TEXT not null,
      user_id integer not null,
      FOREIGN KEY(user_id ) REFERENCES users(id)
    )
  `);

  console.log('done running migrations')
}