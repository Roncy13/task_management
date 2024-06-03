import SmurfResponse, { SmurfAction } from "@core/response";
import { createUserSrv, deleteUserSrv, getAllUsersSrv, getUserSrv, updateUserSrv, userLoginSrv } from "./user.services";
import { HTTP_METHODS } from "@utilities/constants";
import { CredentialsSchema, ParamUserIdSchema, UpdateUserSchema, UserSchema } from "./user.validators";
import { Request } from "express";
import { IUser, TLogin } from "./user.interface";
import AuthGuard from "@guards/authentication.guard";

@SmurfAction({
  action: '/users',
  message: 'Users fetched successfully',
  guards: [
    AuthGuard
  ]
})
export class GetUsersApi extends SmurfResponse {

  async run() {
    this.result = await getAllUsersSrv()
  }
}

@SmurfAction({
  action: '/user/:id',
  message: 'User fetched successfully',
  validation: ParamUserIdSchema,
  guards: [
    AuthGuard
  ]
})
export class GetUserApi extends SmurfResponse {

  async run(req: Request) {
    const id = req.params.id as unknown as number
      
    this.result = await getUserSrv(id)
  }
}

@SmurfAction({
  action: '/user',
  message: 'User created successfully',
  method: HTTP_METHODS.POST,
  validation: UserSchema,
  guards: [
    AuthGuard
  ]
})
export class CreateUserApi extends SmurfResponse {

  async run(req: Request) {
    const body = req.body as unknown as IUser
     
    this.result = await createUserSrv(body)
  }
}

@SmurfAction({
  action: '/user/:id',
  message: 'User updated successfully',
  method: HTTP_METHODS.PUT,
  validation: UpdateUserSchema,
  guards: [
    AuthGuard
  ]
})
export class UpdateUserApi extends SmurfResponse {

  async run(req: Request) {
    const { body, params }= req
    const payload = Object.assign({}, body, params) as IUser
     
    this.result = await updateUserSrv(payload)
  }
}

@SmurfAction({
  action: '/user/:id',
  message: 'User deleted successfully',
  method: HTTP_METHODS.DELETE,
  validation: ParamUserIdSchema,
  guards: [
    AuthGuard
  ]
})
export class DeleteUserApi extends SmurfResponse {

  async run(req: Request) {
    const id = req.params.id as unknown as number
      
    this.result = await deleteUserSrv(id)
  }
}

@SmurfAction({
  action: '/user/login',
  message: 'Login successfully',
  method: HTTP_METHODS.POST,
  validation: CredentialsSchema,
  guards: [
    AuthGuard
  ]
})
export class UserLoginApi extends SmurfResponse {

  async run(req: Request) {
    const body = req.body as unknown as TLogin
     
    this.result = await userLoginSrv(body)
  }
}