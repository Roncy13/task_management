import isEmpty from "lodash/isEmpty"
import { ITask, ITaskById, TCreateTask, TUpdateTask } from "./tasks.interface"
import { createTaskModel, deleteTaskModel, getAllTasksModel, getTasksModel, updateTaskModel } from "./tasks.model"

export const getAllTaskSrv = async (userId: number) => {
  const result = await getAllTasksModel(userId)

  return result
}

export const createTaskSrv = async (payload: TCreateTask) => {
  const lastID = await createTaskModel(payload)
	const result = await getTasksModel({ userId: payload.user_id, id: lastID })

  return result
}

export const updateTaskSrv = async (payload: TUpdateTask) => {
  const lastID = await updateTaskModel(payload)
  const result = await getTasksModel({ userId: payload.user_id, id: lastID })

  return result
}

export const deleteTaskSrv = async(payload: ITaskById) => {
  await deleteTaskModel(payload)
  const result = await getTaskSrv(payload)

  return result
}

export const getTaskSrv = async(payload: ITaskById) => {
  const result = await getTasksModel(payload)

  return isEmpty(result) ? null : result
}