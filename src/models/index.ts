import { db } from '@config/connection'

export class DatabaseModel {
  static async all<T>(qry: string, parameters: any[] = []) {
    const result = await new Promise((resolve) => {
      db.all(qry, parameters, (err, tasks = []) => {
        console.log(err, 'err')
        console.log(tasks, ' tasks results ')
        resolve(tasks)
      })
    })

    return result
  }

  static async get<T>(qry: string, parameters: any[] = []) {
    const result = await new Promise((resolve) => {
      db.get(qry, parameters, (err, tasks = []) => {
        console.log(err, 'err')
        console.log(tasks, ' tasks results ')
        resolve(tasks)
      })
    })

    return result
  }

  static async execute<T>(qry: string, parameters: any[] = []) {
    const result = await new Promise((resolve) => {
      db.run(qry, parameters)
    })

    return result
  }
}