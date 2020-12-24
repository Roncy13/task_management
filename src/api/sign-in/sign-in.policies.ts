import { GetUserName } from "@base/services/user.service";
import { Request } from "express";
import PolicyError from '@core/policy.error'
import { CheckEmpty } from "@utilities/dataHelper";
import IPolicy from "@base/error-types/ipolicy.interface";
import { compareSync } from 'bcrypt';

export const CheckUserNameIfTest = async(req: Request, res: Response, next: any) => {
  const { userName } = req.body;

  if (userName === 'test') {
    return next();
  }

  const payload: IPolicy = {
    message: 'User Name is not equal to test',
    errors:  req.body,
    name: 'User not Exist'
  }

  const errPolicy = new PolicyError(payload);
  return next(errPolicy);
}

export const CheckUserNameExist = async(req: Request, res: Response, next: any) => {
  const { userName } = req.body;
  const checkUser = await GetUserName(userName);

  if (CheckEmpty(checkUser)) {
    const payload: IPolicy = {
      message: 'User Name does not exist in the records',
      errors:  req.body,
      name: 'User not Exist'
    }
    const errPolicy = new PolicyError(payload);
    return next(errPolicy);
  }
  next();
}

export const CheckUserPasswords = async (req: Request, res: Response, next: any) => {
  const { userName, password } = req.body;
  const user: any  = await GetUserName(userName);

  if (CheckEmpty(user)) {
    const payload: IPolicy = {
      message: 'Usernamedoes not exist',
      errors:  req.body,
      name: 'Username not Exist'
    }
    const errPolicy = new PolicyError(payload);
    return next(errPolicy);
  }

  if (!compareSync(password, user[0].password)) {
    const payload: IPolicy = {
      message: 'Invalid Username or Password',
      errors:  req.body,
      name: 'Username does not Exist'
    }
    const errPolicy = new PolicyError(payload);
    return next(errPolicy);
  }
  next();
}
