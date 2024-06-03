import isEmpty from "lodash/isEmpty"
import { ITask, ITaskById, TCreateTask, TUpdateTask } from "./tasks.interface"
import { createTaskModel, deleteTaskModel, getAllTasksModel, getTasksModel, updateTaskModel } from "./tasks.model"

export const getAllTaskSrv = async (userId: number) => {
  const result = await getAllTasksModel(userId)

  return result
}

export const createTaskSrv = async (payload: TCreateTask) => {
  const result = await createTaskModel(payload)

  return result
}

export const updateTaskSrv = async (payload: TUpdateTask) => {
  const result = await updateTaskModel(payload)

  return result
}

export const deleteTaskSrv = async(payload: ITaskById) => {
  await deleteTaskModel(payload)
  const result = await getTasksModel(payload)

  return isEmpty(result) ? null : result
}