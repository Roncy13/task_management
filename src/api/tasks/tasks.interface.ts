export type TStatus = 'To Do' | 'In Progress' | 'Done'

export interface ITask {
  id: number
  title: string
  description: string
  status: TStatus
}