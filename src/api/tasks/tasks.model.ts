import { db } from "@config/connection"
import { ITask } from "./tasks.interface"
import { DatabaseModel } from "@models/index"

/**
 * This File is for your model use
 */
export const getAllTasks = async () => {
	const result = await DatabaseModel.all(`
		SELECT
			t.id as task_id,
			t.title as task_title,
			t.description as task_descriptio,
			t.status as task_status
		FROM tasks t
	`)

	return result;
}