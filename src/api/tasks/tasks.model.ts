import { DatabaseModel, IStatement } from "@models/index";
import { ITaskById, ITaskOutput, TCreateTask, ITask } from "./tasks.interface";

export const getAllTasksByUserIdModel = async (userId: number) => {
	const result = await DatabaseModel.all<ITaskOutput>(`
		SELECT
			t.id as task_id,
			t.title as task_title,
			t.description as task_description,
			t.status as task_status,
			t.user_id as task_user_id,
			u.name as user_name
		FROM tasks t
		INNER JOIN users as u
			ON u.id = t.user_id
		WHERE t.user_id = $userId
	`, { userId })

	return result;
}

export const getAllTasksModel = async () => {
	const result = await DatabaseModel.all<ITaskOutput>(`
		SELECT
			t.id as task_id,
			t.title as task_title,
			t.description as task_description,
			t.status as task_status,
			t.user_id as task_user_id,
			u.name as user_name
		FROM tasks t
		INNER JOIN users as u
			ON u.id = t.user_id
	`)

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

export const getTaskByIdModel = async (id: number): Promise<ITaskOutput> => {
	const result = await DatabaseModel.get<ITaskOutput>(`
		SELECT
			t.id as task_id,
			t.title as task_title,
			t.description as task_description,
			t.status as task_status,
			t.user_id as task_user_id
		FROM tasks t
		WHERE t.id = $id
		LIMIT 1
	`, { id })

	return result as ITaskOutput;
}

export const createTaskModel = async (payload: TCreateTask) => {
	const { lastID } = await DatabaseModel.create<IStatement>(`
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

	return lastID;
}

export const updateTaskModel = async (payload: ITask) => {
	const { lastID } = await DatabaseModel.update<IStatement>(`
		UPDATE TASKS
			SET
				title = $title,
				description = $description,
				status = $status
		WHERE
			id = $id AND
			user_id = $user_id
		`,
		{ ...payload }
	);

	return lastID;
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