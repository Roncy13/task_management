import { db } from '@config/connection';

export default async function  migrations() {
  await db.exec(`
    INSERT INTO users(name, email, password, role) values ('james1', 'jamesroncy13+1@gmail.com', 'james', 'admin');
    INSERT INTO users(name, email, password, role) values ('james2', 'jamesroncy13+2@gmail.com', 'james', 'admin');
    INSERT INTO users(name, email, password, role) values ('james3', 'jamesroncy13+3@gmail.com', 'james', 'admin');
  `);

  await db.exec(`
    INSERT INTO tasks(title, description, status, user_id) values ('task james 1', 'task james 1 description', 'To Do', 1);
    INSERT INTO tasks(title, description, status, user_id) values ('task james 2', 'task james 2 description', 'To Do', 2);
    INSERT INTO tasks(title, description, status, user_id) values ('task james 3', 'task james 3 description', 'To Do', 3);
  `);

  const result = await new Promise((resolve) => {
    db.all(`
      SELECT
        t.id as task_id,
        t.title as task_title,
        t.description as task_descriptio,
        t.status as task_status
      FROM tasks t
    `, [], (err, tasks = []) => {
      console.log(err, 'err')
      console.log(tasks, ' tasks results ')
      resolve(tasks)
    })
  })

	console.log(result, ' result')
  console.log('done running migrations')
}