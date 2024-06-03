/**
 * This File is for your model use
 */

import { DatabaseModel } from "@models/index";
import { IUser, TCreateUser } from "./user.interface";

export const getAllUserModel = async () => {
	const result = await DatabaseModel.all<IUser>(`
		SELECT
			id,
      name,
			email,
      password
		FROM users
	`)

	return result;
}

export const getUserModel = async (id: number): Promise<IUser> => {
	const result = await DatabaseModel.get<IUser>(`
    SELECT
      id,
      name,
      email,
      password
    FROM users
		WHERE id = $id
		LIMIT 1
	`, { id })

	return result as IUser;
}

export const createUserModel = async (payload: TCreateUser) => {
	const { lastID } = await DatabaseModel.create<TCreateUser>(`
		INSERT INTO users
			(
				name,
				email,
				password
			)
		VALUES
			(
				$name,
				$email,
				$password
			)
	`, payload);

	return lastID;
}

export const updateUserModel = async (payload: IUser) => {
	const { lastID } = await DatabaseModel.update<IUser>(`
		UPDATE users
			SET
				name = $name,
				password = $password,
				email = $email
		WHERE
			id = $id
		`,
		{ ...payload }
	);

	return lastID;
}

export const deleteUserModel = async (id: number) => {
	const { lastID } = await DatabaseModel.delete(`
		DELETE FROM users
		WHERE
			id = $id
		`,
		{ id }
	);

	return lastID
}