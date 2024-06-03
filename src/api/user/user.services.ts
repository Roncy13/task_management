import isEmpty from "lodash/isEmpty"
import { IUser, TCreateUser } from "./user.interface"
import { createUserModel, deleteUserModel, getAllUserModel, getUserModel, updateUserModel } from "./user.model"

export const getAllUsersSrv = async () => {
  const result = await getAllUserModel()

  return result
}

export const createUserSrv = async (payload: TCreateUser) => {
  const lastId = await createUserModel(payload)
  const result = await getUserModel(lastId)

  return result
}

export const updateUserSrv = async (payload: IUser) => {
  const lastId = await updateUserModel(payload)
  const result = await getUserModel(lastId)

  return result
}

export const deleteUserSrv = async(id: number) => {
  await deleteUserModel(id)
  const result = await getUserSrv(id)

  return result
}

export const getUserSrv = async(id: number) => {
  const result = await getUserModel(id)

  return isEmpty(result) ? null : result
}