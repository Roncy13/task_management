import isEmpty from "lodash/isEmpty"
import { ICredentials, IUser, TCreateUser } from "./user.interface"
import { checkUserEmailPasswordModel, createUserModel, deleteUserModel, getAllUserModel, getUserModel, updateUserModel } from "./user.model"
import jwt from 'jsonwebtoken';
import BadRequestException from '@core/badrequest.error';
import { getSecretKey } from "@utilities/dataHelper";

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

export const userLoginSrv = async(payload: ICredentials) => {
  const user = await checkUserEmailPasswordModel(payload)
  if (!user) {
    throw new BadRequestException('Incorrect email/password')
  }
  const result = jwt.sign({ ...user as IUser, password: undefined }, getSecretKey(), { expiresIn: '1d'});

  return result
}