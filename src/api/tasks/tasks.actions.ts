import SmurfResponse, { SmurfAction } from '@core/response'
import AuthGuard from '@guards/authentication.guard'
import { HTTP_METHODS } from '@utilities/constants'
import { Request } from 'express'
import { ITask, ITaskById, ITaskList, ITaskResponse, TCreateTask } from './tasks.interface'
import {
  TaskPolicies
} from './tasks.policy'
import { createTaskSrv, deleteTaskSrv, getAllTaskByUserIdSrv, getAllTaskSrv, getTaskSrv, updateTaskSrv } from './tasks.services'
import { DeleteTaskSchema, PathTaskIdSchema, TaskListSchema, TasksSchema, UpdateTaskSchema } from './tasks.validators'
import { TaskFilterListTransformer } from './task.transformer'


const [TasksUserPolicy] = TaskPolicies

// This is to see all task and to check filters per login to /tasks api

/**
 * API: tasks/View All Task Regardless of the users
 *    task_title: string
 *    task_description string
 *    task_status: string
 *    task_user_id: number
 *    user_name: string
 * Payload:
 * Query:
 *    page: number
 *    taskStatus: string
 *    user: string
 *    limit: number
 *    title: string
 *    sort: asc/desc
 * Auth:
 *  Authorization: Bearer {{Token}}
 */
@SmurfAction({
  action: '/tasks/all',
  message: 'Tasks fetched successfully',
  guards: [
    AuthGuard
  ],
  validation: TaskListSchema
})
export class ListAllTasksApi extends SmurfResponse {
  async run(req: Request) {
    const query = TaskFilterListTransformer(req)

    this.result = await getAllTaskSrv(query)
  }
}

/**
 * API: tasks/Get All Task
 * Response:
 *    task_id: number
 *    task_title: string
 *    task_description string
 *    task_status: string
 *    task_user_id: number
 *    user_name: string
 * Payload:
 *  Query:
 *    page: number
 *    taskStatus: string
 *    user: string
 *    limit: number
 *    title: string
 *    sort: asc/desc
 * Auth:
 *  Authorization: Bearer {{Token}}
 */
@SmurfAction({
  action: '/tasks',
  message: 'Tasks fetched successfully',
  guards: [
    AuthGuard
  ],
  validation: TaskListSchema
})
export class ListTasksApi extends SmurfResponse {
  async run(req: Request, { locals: { user } }: ITaskResponse) {
    const query = TaskFilterListTransformer(req)

    this.result = await getAllTaskByUserIdSrv(user.id, query)
  }
}

/**
 * API: tasks/Create Task
 * Response:
 *    task_id: number
 *    task_title: string
 *    task_description string
 *    task_status: string
 *    task_user_id: number
 * Payload:
 *  Body
 *    title: string
 *    description string
 *    status: string
 * Auth:
 *  Authorization: Bearer {{Token}}
 */

@SmurfAction({
  action: '/task',
  message: 'Tasks created successfully',
  method: HTTP_METHODS.POST,
  validation: TasksSchema,
  guards: [
    AuthGuard
  ],
  policies: [
    TasksUserPolicy
  ]
})
export class CreateTaskApi extends SmurfResponse {
  async run(req: Request) {
    const payload = req.body as TCreateTask

    this.result = await createTaskSrv(payload)
  }
}

/**
 * API: tasks/Update Task
 * Response:
 *    task_id: number
 *    task_title: string
 *    task_description string
 *    task_status: string
 *    task_user_id: number
 * Payload:
  *  Body
  *    title: string
  *    description string
  *    status: string
  *   Params
  *    id: number
 * Auth:
 *  Authorization: Bearer {{Token}}
 * Policies:
 *  Task should exist
 *  Task user id should be equal to auth user id
 */

@SmurfAction({
  action: '/task/:id',
  message: 'Tasks updated successfully',
  method: HTTP_METHODS.PUT,
  validation: UpdateTaskSchema,
  guards: [
    AuthGuard
  ],
  policies: TaskPolicies
})
export class UpdateTaskApi extends SmurfResponse {
  async run(req: Request) {
    const { body, params } = req
    const payload = Object.assign({}, body, params) as ITask

    this.result = await updateTaskSrv(payload)
  }
}

/**
 * API: tasks/Delete Task
 * Response:
 *    task_id: number
 *    task_title: string
 *    task_description string
 *    task_status: string
 *    task_user_id: number
 * Payload:
  *  Body
  *    title: string
  *    description string
  *    status: string
  *   Params
  *    id: number
 * Auth:
 *  Authorization: Bearer {{Token}}
 * Policies:
 *  Task should exist
 *  Task user id should be equal to auth user id
 */

@SmurfAction({
  action: '/task/:id',
  message: 'Tasks deleted successfully',
  method: HTTP_METHODS.DELETE,
  validation: DeleteTaskSchema,
  guards: [
    AuthGuard
  ],
  policies: TaskPolicies
})
export class DeleteTaskApi extends SmurfResponse {
  async run(req: Request) {
    const { params } = req
    const payload = Object.assign({}, { ...params }) as unknown as ITaskById

    this.result = await deleteTaskSrv(payload)
  }
}

/**
 * API: tasks/Get Task
 * Response:
 *    task_id: number
 *    task_title: string
 *    task_description string
 *    task_status: string
 *    task_user_id: number
 * Payload:
  *   Params
  *    id: number
 * Auth:
 *  Authorization: Bearer {{Token}}
 * Policies:
 *  Task should exist
 *  Task user id should be equal to auth user id
 */

@SmurfAction({
  action: '/task/:id',
  message: 'Task fetched successfully',
  method: HTTP_METHODS.GET,
  validation: PathTaskIdSchema,
  guards: [
    AuthGuard
  ],
  policies: TaskPolicies
})
export class GetTaskApi extends SmurfResponse {
  async run(req: Request, { locals: { user } }: ITaskResponse) {
    const { params } = req
    const payload = Object.assign({}, { ...params, userId: user.id }) as unknown as ITaskById

    this.result = await getTaskSrv(payload)
  }
}