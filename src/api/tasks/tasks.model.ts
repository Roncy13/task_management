import { DatabaseModel, IStatement } from "@models/index";
import { ITaskById, ITaskOutput, TCreateTask, ITask, ITaskList, ITaskListFilter, ITaskCount } from "./tasks.interface";
import { EPageSort, TASK_LIMIT } from "./tasks.enums";

const queryTaskFilters = (filter: ITaskListFilter, prepend: string[] = []) => {
	const stmts = []

	if (prepend.length > 0) {
		prepend.forEach(p => stmts.push(p))
	}

	if (filter?.title) {
		stmts.push(`t.title LIKE $title`)
	}

	if (filter?.status) {
		stmts.push(`t.status = $status`)
	}

	if (filter?.user) {
		stmts.push(`u.name = $name`)
	}

	return stmts.length > 0 ? `WHERE ${stmts.join(' AND ')}` : ''
}

const queryTaskSort = (sort: EPageSort = null) => {
	if (sort === EPageSort.ASC) {
		return 'ORDER BY t.title ASC'
	}

	if (sort === EPageSort.DESC) {
		return 'ORDER BY t.title DESC'
	}

	return ''
}

const queryLimit = (page: number, limit: number = TASK_LIMIT) => {
	const offset = (page - 1) * limit
	const result = `LIMIT ${limit} OFFSET ${offset | 0}`

	return result
}

const getTaskListPayload = (userId: number, query: ITaskList) => {
	const payload = {
		userId,
		...query.filter,
		title: `'%james 1%'`
	}

	if (query.filter.status === undefined) {
		delete payload.status
	}

	if (query.filter.user === undefined) {
		delete payload.status
	}

	return payload
}

export const getAllTasksByUserIdModel = async (userId: number, query: ITaskList) => {
	const pagination = queryLimit(query.page, query.limit)
	const taskFilters = queryTaskFilters(query.filter, ['t.user_id = $userId'])
	const sort = queryTaskSort(query.sort)
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
		${taskFilters}
		${pagination}
		${sort}
	`, { ...query.filter })

	return result;
}

export const getAllTasksByUserIdCountModel = async (userId: number, query: ITaskList) => {
	const taskFilters = queryTaskFilters(query.filter, ['t.user_id = $userId'])
	const result = await DatabaseModel.get<ITaskCount>(`
		SELECT
			count(1) as total
		FROM tasks t
		INNER JOIN users as u
			ON u.id = t.user_id
		${taskFilters}
	`, { ...query.filter, userId })

	return result as ITaskCount;
}

export const getAllTasksModel = async (query: ITaskList) => {
	const pagination = queryLimit(query.page, query.limit)
	const sort = queryTaskSort(query.sort)
	const taskFilters = queryTaskFilters(query.filter)
	const findQuery = `
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
		${taskFilters}
		${sort}
		${pagination}
	`
	const result = await DatabaseModel.all<ITaskOutput>(findQuery, {
		...query.filter
	})
	
	return result;
}

export const getAllTasksCountModel = async (query: ITaskList) => {
	const taskFilters = queryTaskFilters(query.filter)
	const findQuery = `
		SELECT
			count(1) as total
		FROM tasks t
		INNER JOIN users as u
			ON u.id = t.user_id
		${taskFilters}
	`
	const result = await DatabaseModel.get<ITaskCount>(findQuery, {...query.filter})
	
	return result as ITaskCount;
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