import { ITask, TCreateTask, TUpdateTask } from "./tasks.interface"
import { createTaskModel, getAllTasksModel, updateTaskModel } from "./tasks.model"

export const getAllTaskSrv = async (userId: number) => {
  const result = await getAllTasksModel(userId)

  return result
}

export const createTaskSrv = async (payload: TCreateTask) => {
  const result = await createTaskModel(payload)

  return result
}

export const updateTaskSrv = async (payload: TUpdateTask) => {
  const result = await updateTaskModel(payload) as ITask

  return result
}