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
}

export interface ITaskById {
  userId: number
  id: number
}

export type TCreateTask = Omit<ITask, 'id'>
export type TUpdateTask = Omit<ITask, 'id'>
