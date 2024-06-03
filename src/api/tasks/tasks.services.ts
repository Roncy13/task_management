import { getAllTasks } from "./tasks.model"

/**
 * For Typeorm use
 * import { GetConnection } from '@config/database';
 * const model = GetConnection( Put Your Typeorm Schema Here);
 * export function TasksAllSrv() {
 *   return model.find();
 * }
 */
export const getAllTaskSrv = async () => {
  const result = await getAllTasks();

  return result;
}