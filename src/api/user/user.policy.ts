import { NextFunction, Request, Response } from "express";
import { IUserResponse } from "./user.interface";
import { ERole } from "./user.constants";
import PolicyError from "@core/policy.error";
import { checkUserByEmailSrv } from "./user.services";

/**
 * Example Policy Controller for Smurf
 */
export const AdminRolePolicy = async(_req: Request, res: IUserResponse, next: NextFunction) => {
  const { user } = res.locals

  if (user.role !== ERole.ADMIN) {
    throw new PolicyError({
      message: 'Role is not admin'
    })
  }
  // Provide throw for your policy error
  next();
}

export const CheckCreateUserEmailPolicy = async(req: Request, _res: IUserResponse, next: NextFunction) => {
  const { email } = req.body
  const result = await checkUserByEmailSrv(email)

  if (result) {
    throw new PolicyError({
      message: 'Email exist'
    })
  }
  // Provide throw for your policy error
  next();
}

export const CheckUpdateUserEmailPolicy = async(req: Request, _res: IUserResponse, next: NextFunction) => {
  const { email } = req.body
  const { id } = req.params
  const result = await checkUserByEmailSrv(email)

  if (result && `${result.id}` !== `${id}`) {
    throw new PolicyError({
      message: 'Email exist'
    })
  }
  // Provide throw for your policy error
  next();
}