import SmurfResponse, { SmurfAction } from "@core/response";
import { createUserSrv, deleteUserSrv, getAllUsersSrv, getUserSrv, updateUserSrv } from "./user.services";
import { HTTP_METHODS } from "@utilities/constants";
import { ParamUserIdSchema, UpdateUserSchema, UserSchema } from "./user.validators";
import { Request } from "express";
import { IUser } from "./user.interface";

@SmurfAction({
  action: '/users',
  message: 'Users fetched successfully',
})
export class GetUsersApi extends SmurfResponse {

  async run() {
    this.result = await getAllUsersSrv()
  }
}

@SmurfAction({
  action: '/user/:id',
  message: 'User fetched successfully',
  validation: ParamUserIdSchema
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
  validation: UserSchema
})
export class CreateUserApi extends SmurfResponse {

  async run(req: Request) {
    const body = req.body as unknown as IUser
     
    this.result = await createUserSrv(body)
  }
}

@SmurfAction({
  action: '/user/:id',
  message: 'User created successfully',
  method: HTTP_METHODS.PUT,
  validation: UpdateUserSchema
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
  validation: ParamUserIdSchema
})
export class DeleteUserApi extends SmurfResponse {

  async run(req: Request) {
    const id = req.params.id as unknown as number
      
    this.result = await deleteUserSrv(id)
  }
}