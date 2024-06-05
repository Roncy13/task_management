import SmurfResponse, { SmurfAction } from "@core/response";
import { createUserSrv, deleteUserSrv, getAllUsersSrv, getUserSrv, updateUserSrv, userLoginSrv } from "./user.services";
import { HTTP_METHODS } from "@utilities/constants";
import { CredentialsSchema, ParamUserIdSchema, UpdateUserSchema, UserSchema } from "./user.validators";
import { Request } from "express";
import { IUser, TLogin } from "./user.interface";
import AuthGuard from "@guards/authentication.guard";
import { AdminRolePolicy, CheckCreateUserEmailPolicy, CheckUpdateUserEmailPolicy, NotAllowAdminToDeleteUser, CheckIfUserHasTaskRecordsPolicy } from "./user.policy";

/**
 * API: users/Get All Users
 * Response:
 *    id: number
 *    name: string
 *    email: string
 *    password: string
 *    role: string
 * Payload:
 * Auth:
 *  Authorization: Bearer {{Token}}
 * Role:
 *  admin
 */

@SmurfAction({
  action: '/users',
  message: 'Users fetched successfully',
  guards: [
    AuthGuard
  ],
  policies: [AdminRolePolicy]
})
export class GetUsersApi extends SmurfResponse {

  async run() {
    this.result = await getAllUsersSrv()
  }
}

/**
 * API: users/Get User
 * Response:
 *    id: number
 *    name: string
 *    email: string
 *    password: string
 *    role: string
 * Payload:
 *  Params:
 *    id: number
 * Auth:
 *  Authorization: Bearer {{Token}}
 * Role:
 *  admin
 */

@SmurfAction({
  action: '/user/:id',
  message: 'User fetched successfully',
  validation: ParamUserIdSchema,
  guards: [
    AuthGuard
  ],
  policies: [AdminRolePolicy]
})
export class GetUserApi extends SmurfResponse {

  async run(req: Request) {
    const id = req.params.id as unknown as number
      
    this.result = await getUserSrv(id)
  }
}

/**
 * API: users/Create User
 * Response:
 *    id: number
 *    name: string
 *    email: string
 *    password: string
 *    role: string
 * Payload:
 *  Body:
 *    name: string!
 *    email: string!
 *    password: string!
 *    role: string!
 * Auth:
 *  Authorization: Bearer {{Token}}
 * Role:
 *  admin
 * Policy:
 *  email should not exist
 */

@SmurfAction({
  action: '/user',
  message: 'User created successfully',
  method: HTTP_METHODS.POST,
  validation: UserSchema,
  guards: [
    AuthGuard
  ],
  policies: [AdminRolePolicy, CheckCreateUserEmailPolicy]
})
export class CreateUserApi extends SmurfResponse {

  async run(req: Request) {
    const body = req.body as unknown as IUser
     
    this.result = await createUserSrv(body)
  }
}

/**
 * API: users/Update User
 * Response:
 *    id: number
 *    name: string
 *    email: string
 *    password: string
 *    role: string
 * Payload:
 *  Body:
 *    name: string!
 *    email: string!
 *    password: string!
 *    role: string!
 * Auth:
 *  Authorization: Bearer {{Token}}
 * Role:
 *  admin
 * Policy:
 *  email should not exist on other record
 */

@SmurfAction({
  action: '/user/:id',
  message: 'User updated successfully',
  method: HTTP_METHODS.PUT,
  validation: UpdateUserSchema,
  guards: [
    AuthGuard
  ],
  policies: [AdminRolePolicy, CheckUpdateUserEmailPolicy]
})
export class UpdateUserApi extends SmurfResponse {

  async run(req: Request) {
    const { body, params }= req
    const payload = Object.assign({}, body, params) as IUser
     
    this.result = await updateUserSrv(payload)
  }
}

/**
 * API: users/Delete User
 * Response:
 *    id: number
 *    name: string
 *    email: string
 *    password: string
 *    role: string
 * Payload:
 *  Body:
 *    name: string!
 *    email: string!
 *    password: string!
 *    role: string!
 * Auth:
 *  Authorization: Bearer {{Token}}
 * Role:
 *  admin
 * Policy:
 *  Admin Role cannot be deleted
 */

@SmurfAction({
  action: '/user/:id',
  message: 'User deleted successfully',
  method: HTTP_METHODS.DELETE,
  validation: ParamUserIdSchema,
  guards: [
    AuthGuard
  ],
  policies: [
    AdminRolePolicy,
    NotAllowAdminToDeleteUser,
    CheckIfUserHasTaskRecordsPolicy]
})
export class DeleteUserApi extends SmurfResponse {

  async run(req: Request) {
    const id = req.params.id as unknown as number
      
    this.result = await deleteUserSrv(id)
  }
}

/**
 * API: auth/User Login
 * Response:
 *    result: string
 * Payload:
 *  Body:
 *    email: string!
 *    password: string!
 */

@SmurfAction({
  action: '/user/login',
  message: 'Login successfully',
  method: HTTP_METHODS.POST,
  validation: CredentialsSchema,
})
export class UserLoginApi extends SmurfResponse {
  async run(req: Request) {
    const body = req.body as unknown as TLogin
     
    this.result = await userLoginSrv(body)
  }
}