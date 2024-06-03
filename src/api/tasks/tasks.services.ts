import { ITask, ITaskById, TCreateTask } from "./tasks.interface"
import { createTaskModel, deleteTaskModel, getAllTasksByUserIdModel, getAllTasksModel, getTaskByIdModel, getTasksModel, updateTaskModel } from "./tasks.model"

export const getAllTaskByUserIdSrv = async (userId: number) => {
  const result = await getAllTasksByUserIdModel(userId)

  return result
}

export const getAllTaskSrv = async () => {
  const result = await getAllTasksModel()

  return result
}

export const createTaskSrv = async (payload: TCreateTask) => {
  const lastID = await createTaskModel(payload)
	const result = await getTasksModel({ userId: payload.user_id, id: lastID })

  return result
}

export const updateTaskSrv = async (payload: ITask) => {
  await updateTaskModel(payload)
  const result = await getTasksModel({ userId: payload.user_id, id: payload.id })

  return result
}

export const deleteTaskSrv = async(payload: ITaskById) => {
  await deleteTaskModel(payload)
  const result = await getTaskSrv(payload)

  return result
}

export const getTaskSrv = async(payload: ITaskById) => {
  const result = await getTasksModel(payload)

  return result
}

export const getTaskByIdSrv = async(id: number) => {
  const result = await getTaskByIdModel(id)

  return result
}