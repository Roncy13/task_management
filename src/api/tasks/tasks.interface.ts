import { Response } from "express"
import { IUserLocalReponse } from "../user/user.interface"
import { ETaskStatus } from "./tasks.enums"
export interface ITask {
  id: number
  title: string
  description: string
  status: ETaskStatus
  user_id: number
}
export interface ITaskOutput {
  task_id: number
	task_title: string
	task_description: string
	task_status: ETaskStatus
	task_user_id: number
  user_name: string
}

export interface ITaskById {
  userId: number
  id: number
}

export type TCreateTask = Omit<ITask, 'id'>

interface ITasKLocals extends Pick<Response, 'locals'> {
  task: ITaskOutput
}
export interface ITaskResponse extends Response {
  locals: ITasKLocals & IUserLocalReponse
}
