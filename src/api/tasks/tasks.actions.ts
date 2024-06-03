import SmurfResponse, { SmurfAction } from "@core/response";
import { createTaskSrv, deleteTaskSrv, getAllTaskSrv, getTaskSrv, updateTaskSrv } from "./tasks.services";
import { HTTP_METHODS } from "@utilities/constants";
import { DeleteTaskSchema, QueryTaskIdSchema, TasksSchema, UpdateTaskSchema } from "./tasks.validators";
import { Request } from "express";
import { ITaskById, TCreateTask, TUpdateTask } from "./tasks.interface";

@SmurfAction({
  action: '/tasks',
  message: 'Tasks fetched successfully',
})
export class ListTasksApi extends SmurfResponse {
  async run() {
    this.result = await getAllTaskSrv(2);
  }
}

@SmurfAction({
  action: '/task',
  message: 'Tasks created successfully',
  method: HTTP_METHODS.POST,
  validation: TasksSchema
})
export class CreateTaskApi extends SmurfResponse {
  async run(req: Request) {
    const payload = req.body as TCreateTask
    Object.assign(payload, { user_id: 2 })
    this.result = await createTaskSrv(payload)
  }
}

@SmurfAction({
  action: '/task/:id',
  message: 'Tasks updated successfully',
  method: HTTP_METHODS.PUT,
  validation: UpdateTaskSchema
})
export class UpdateTaskApi extends SmurfResponse {
  async run(req: Request) {
    const { body, params } = req
   
    const payload = Object.assign({}, body, params) as TUpdateTask
    Object.assign(payload, { user_id: 2 })
    console.log(payload, 'payload')
    this.result = await updateTaskSrv(payload)
  }
}

@SmurfAction({
  action: '/task/:id',
  message: 'Tasks deleted successfully',
  method: HTTP_METHODS.DELETE,
  validation: DeleteTaskSchema
})
export class DeleteTaskApi extends SmurfResponse {
  async run(req: Request) {
    const { params } = req
   
    const payload = Object.assign({}, { ...params }) as unknown as ITaskById
    Object.assign(payload, { userId: 2 })
    this.result = await deleteTaskSrv(payload)
  }
}

@SmurfAction({
  action: '/task/:id',
  message: 'Task fetched successfully',
  method: HTTP_METHODS.GET,
  validation: QueryTaskIdSchema
})
export class GetTaskApi extends SmurfResponse {
  async run(req: Request) {
    const { params } = req
   
    const payload = Object.assign({}, { ...params }) as unknown as ITaskById
    Object.assign(payload, { userId: 2 })
    this.result = await getTaskSrv(payload)
  }
}