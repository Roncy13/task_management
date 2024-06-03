import { db } from '@models/base';

export default function database() {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER not null primary key,
      name TEXT not null,
      email TEXT not null,
      password TEXT not null
    )`
  );

  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER not null primary key,
      title TEXT not null,
      description TEXT not null,
      status TEXT not null,
      user_id integer not null,
      FOREIGN KEY(user_id ) REFERENCES users(id)
    )`
  );
}