export interface ICredentials {
  email: string
  password: string
}
export interface IUser extends ICredentials {
  id: number
  name: string
}

export type TCreateUser = Omit<IUser, 'id'>
export type TLogin = Omit<TCreateUser, 'name'>
