export interface IUser {
  id: number
  name: string
  email: string
  password?: string
}

export type TCreateUser = Omit<IUser, 'id'>