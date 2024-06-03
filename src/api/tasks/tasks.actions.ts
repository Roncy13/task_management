import SmurfResponse, { SmurfAction } from "@core/response";
import AuthGuard from "@guards/authentication.guard";
import { HTTP_METHODS } from "@utilities/constants";
import { Request } from "express";
import { ITask, ITaskById, ITaskResponse, TCreateTask } from "./tasks.interface";
import { getAllTasksByUserIdModel } from "./tasks.model";
import {
  TaskPolicies
} from "./tasks.policy";
import { createTaskSrv, deleteTaskSrv, getAllTaskSrv, getTaskSrv, updateTaskSrv } from "./tasks.services";
import { DeleteTaskSchema, PathTaskIdSchema, TasksSchema, UpdateTaskSchema } from "./tasks.validators";


const [TasksUserPolicy] = TaskPolicies
// This is to see all task and to check filters per login to /tasks api
@SmurfAction({
  action: '/tasks/all',
  message: 'Tasks fetched successfully',
  guards: [
    AuthGuard
  ],
})
export class ListAllTasksApi extends SmurfResponse {
  async run() {
    this.result = await getAllTaskSrv();
  }
}
@SmurfAction({
  action: '/tasks',
  message: 'Tasks fetched successfully',
  guards: [
    AuthGuard
  ],
})
export class ListTasksApi extends SmurfResponse {
  async run(_req: Request, { locals: { user } }: ITaskResponse) {
    this.result = await getAllTasksByUserIdModel(user.id);
  }
}

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