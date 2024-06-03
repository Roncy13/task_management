import { DatabaseModel } from "@models/index"
import { ITask, ITaskById, ITaskOutput, TCreateTask, TUpdateTask } from "./tasks.interface";

export const getAllTasksModel = async (userId: number) => {
	const result = await DatabaseModel.all<ITaskOutput>(`
		SELECT
			t.id as task_id,
			t.title as task_title,
			t.description as task_description,
			t.status as task_status,
			t.user_id as task_user_id
		FROM tasks t
		WHERE t.user_id = $userId
	`, { userId })

	return result;
}

export const getTasksModel = async (payload: ITaskById): Promise<ITaskOutput> => {
	const result = await DatabaseModel.get<ITaskOutput>(`
		SELECT
			t.id as task_id,
			t.title as task_title,
			t.description as task_description,
			t.status as task_status,
			t.user_id as task_user_id
		FROM tasks t
		WHERE t.id = $id and t.user_id = $userId
		LIMIT 1
	`, { ...payload })

	return result as ITaskOutput;
}

export const createTaskModel = async (payload: TCreateTask) => {
	const { lastID } = await DatabaseModel.create<TCreateTask>(`
		INSERT INTO TASKS
			(
				title,
				description,
				status,
				user_id
			)
		VALUES
			(
				$title,
				$description,
				$status,
				$user_id
			)
	`, payload);
	const result = await getTasksModel({ userId: payload.user_id, id: lastID })

	return result;
}

export const updateTaskModel = async (payload: TUpdateTask) => {
	const { lastID } = await DatabaseModel.update<TUpdateTask>(`
		UPDATE TASKS
			SET
				title = $title,
				description = $description,
				status = $status
		WHERE
			id = $id AND
			user_id = $user_id
		`,
		payload
	);
	const result = await getTasksModel({ userId: payload.user_id, id: lastID })

	return result;
}

export const deleteTaskModel = async (payload: ITaskById) => {
	const { lastID } = await DatabaseModel.delete(`
		DELETE FROM TASKS
		WHERE
			id = $id AND
			user_id = $userId
		`,
		{ ...payload }
	);
	

	return lastID
}