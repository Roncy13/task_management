import { Response } from 'express'
import { ERole } from './user.constants'
export interface ICredentials {
  email: string
  password: string
}

export type TRole = ERole.ADMIN | ERole.USER
export interface IUser extends ICredentials {
  id: number
  name: string
  role: TRole
}

export type TCreateUser = Omit<IUser, 'id'>
export type TLogin = Omit<TCreateUser, 'name'>
export interface IUserLocalReponse extends Pick<Response, 'locals'> {
  user: IUser
} 
export interface IUserResponse extends Response {
  locals: IUserLocalReponse
}
