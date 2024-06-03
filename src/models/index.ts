import { TCreateTask } from '@base/api/tasks/tasks.interface'
import { db } from '@config/connection'
interface IParameter {
  [x: string]: string | number | TCreateTask
}
export interface IStatement {
  lastID: number
  changes: number
}
export class DatabaseModel {
  static mapParameters (parameters: IParameter = {}) {
    return Object.keys(parameters).reduce((acc, val) => {
      return {...acc, [`$${val}`]: parameters[val]}
    }, {})
  }

  static async all<T>(qry: string, parameters: IParameter = {}) {
    try {
      const payload = this.mapParameters(parameters)
      const result = await new Promise<T[]>((resolve, reject) => {
        db.all<T>(qry, payload, (err, records = []) => {
          if (err) {
            return reject(err)
          }
          resolve(records)
        })
      })
  
      return result
    } catch (err) {
      console.log(err)
      throw new Error('Error in all query execution')
    }
  }

  static async get<T>(qry: string, parameters: IParameter = {}) {
    try {
      const payload = this.mapParameters(parameters)
      const result = await new Promise((resolve, reject) => {
        db.get(qry, payload, (err, tasks = []) => {
          if (err) {
            return reject(err)
          }
          resolve(tasks)
        })
      })

      return result
    } catch (err) {
      console.log(err)
      throw new Error('Error in get query execution')
    }
  }

  static async create<T>(qry: string, parameters:IParameter = null): Promise<IStatement> {
    try {
      const result = await this.execute(qry, parameters) as IStatement
      
      return result
    } catch (err) {
      console.log(err)
      throw new Error('Error in create query execution')
    }
  }

  static async update<T>(qry: string, parameters:IParameter = null) {
    try {
      const result = await this.execute(qry, parameters) as IStatement
      
      return result
    } catch (err) {
      console.log(err)
      throw new Error('Error in update query execution')
    }
  }

  static async delete<T>(qry:string, parameters:IParameter = null) {
    try {
      console.log('delete delete')
      const result = await this.execute(qry, parameters) as IStatement
      
      return result
    } catch (err) {
      console.log(err)
      throw new Error('Error in delete query execution')
    }
  }

  static async execute<T>(qry: string, parameters: IParameter = {}) {
    const payload = this.mapParameters(parameters)
    console.log(payload, 'payload')
    const result = await new Promise((resolve, reject) => {
      db.run(qry, payload, function (err: Error) {
        if (err) {
          return reject(err)
        }
        resolve(this)
      })
    })

    console.log(result, 'result')
    return result
  }
}