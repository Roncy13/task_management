import { Request } from "express";
import { ITaskList } from "./tasks.interface";

export const TaskFilterListTransformer = (req: Request) => {
  const { query } = req;
  const filter = {}

  if (query.taskStatus) {
    Object.assign(filter, { status: query.taskStatus })
  }

  if (query.title) {
    Object.assign(filter, { title: `%${query.title}%` })
  }

  if (query.user) {
    Object.assign(filter, { user: query.user })
  }

  const result = {
    sort: query.sort || undefined,
    page: Number(query.page) || 1,
    limit: Number(query.limit) || 5,
  } as unknown as ITaskList

  if (Object.keys(query).length > 0) {
    Object.assign(result, { filter })
  }

  return result
}