import { NextFunction, Request } from "express";
import { ITaskResponse } from "./tasks.interface";
import PolicyError from "@core/policy.error";
import { getTaskByIdSrv, getTaskSrv } from "./tasks.services";
import { StatusCodes } from "http-status-codes";
import { LocalsUserPolicy } from "../user/user.policy";

/**
 * Example Policy Controller for Smurf
 */

export const CheckTaskPolicy = async (req: Request, res: ITaskResponse, next: NextFunction) => {
  const task = await getTaskByIdSrv(req.body.id || req.params.id)

  if (!task) {
    throw new PolicyError({
      message: 'Task Not Found',
      statusCode: StatusCodes.NOT_FOUND
    })
  }

  res.locals = {
    ...res.locals,
    task
  }

  next()
}

export const CheckTaskUserPolicy = async (req: Request, res: ITaskResponse, next: NextFunction) => {
  const { task, user } = res.locals
  if (task.task_user_id !== user.id) {
    throw new PolicyError({
      message: 'You are not allowed to create/update/delete/view this task',
      statusCode: StatusCodes.CONFLICT
    })
  }

  next()
}

export const TaskPolicies = [
  LocalsUserPolicy,
  CheckTaskPolicy,
  CheckTaskUserPolicy
]