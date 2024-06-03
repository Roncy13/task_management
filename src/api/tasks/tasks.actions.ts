import SmurfResponse, { SmurfAction } from "@core/response";
import { getAllTaskSrv } from "./tasks.services";

@SmurfAction({
  action: '/tasks',
  message: 'Tasks fetched successfully',
})
export class TasksApi extends SmurfResponse {

  async run() {
    this.result = await getAllTaskSrv();
  }
}