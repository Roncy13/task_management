import { TASK_LIMIT } from "./tasks.enums"
import { ITask, ITaskById, ITaskList, ITaskOutput, TCreateTask } from "./tasks.interface"
import { createTaskModel, deleteTaskModel, getAllTasksByUserIdCountModel, getAllTasksByUserIdModel, getAllTasksCountModel, getAllTasksModel, getTaskByIdModel, getTasksModel, updateTaskModel } from "./tasks.model"

interface IFormatPage {
  total: number
  items: ITaskOutput[]
  currentPage: number
  limit?: number
}

const formatPage = (payload: IFormatPage) => {
  const pages = Math.ceil(payload.total / payload.limit || TASK_LIMIT)

  return {
    total: payload.total,
    items: payload.items,
    currentPage: payload.currentPage | 1,
    pages
  } as Omit<IFormatPage, 'limit'> & { pages: number }
}

export const getAllTaskByUserIdSrv = async (userId: number, query: ITaskList) => {
  const { total } = await getAllTasksByUserIdCountModel(userId, query)
  const result = await getAllTasksByUserIdModel(userId, query, total)

  return formatPage({
    total,
    limit: query.limit,
    items: result,
    currentPage: query.page
  })
}

export const getAllTaskSrv = async (query: ITaskList) => {
  const { total } = await getAllTasksCountModel(query)
  const result = await getAllTasksModel(query, total)

  return formatPage({
    total,
    limit: query.limit,
    items: result,
    currentPage: query.page
  })
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