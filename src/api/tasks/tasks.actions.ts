import SmurfResponse, { SmurfAction } from "@core/response";
import { createTaskSrv, getAllTaskSrv, updateTaskSrv } from "./tasks.services";
import { HTTP_METHODS } from "@utilities/constants";
import { TasksSchema, UpdateTaskSchema } from "./tasks.validators";
import { Request } from "express";
import { TCreateTask, TUpdateTask } from "./tasks.interface";

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