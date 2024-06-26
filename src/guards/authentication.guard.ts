import { Request, Response } from "express";
import IGuard from '@error-handling/iguard.interface';
import { StatusCodes } from 'http-status-codes';
import GuardError from '@core/guard.error';
import { verify } from 'jsonwebtoken'
import { getSecretKey } from "@utilities/dataHelper";

const checkEncodedToken = (token: string) => {
  const arrayToken = token?.split?.('.')
  if (arrayToken.length !== 3) {
    return false
  }
  const decoded = verify(token, getSecretKey());

  return decoded
}

const checkToken = (authorization: string) => {
  const token = authorization?.split?.(' ')
  const headerPrefix = token?.[0]
  const accessToken = token?.[1]
  if (headerPrefix !== 'Bearer') {
    return false
  }

  const decodedToken = checkEncodedToken(accessToken)
  if (!decodedToken) {
    return false
  }

  return decodedToken
}

export default  (req: Request, res: Response, next: any) => {

  const payload: IGuard = {
    message: 'Authentication required',
    errors: [],
    statusCode: StatusCodes.UNAUTHORIZED,
    name: 'Not Allowed'
  }

  const guardErr = new GuardError(payload);
  const { authorization } = req.headers
  const verifyToken = checkToken(authorization)
  
  if (!verifyToken) {
    next(guardErr);
  }

  res.locals = {
    ...res.locals,
    user: verifyToken
  }

  // add the guardErr in next to execute the guard handling
  next();
}
