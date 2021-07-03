import { Request } from "express";
import GuardError from "@core/guard.error";
import IGuard from '@error-handling/iguard.interface';
import { StatusCodes } from 'http-status-codes';

/**
 * Example Guard Controller for Smurf
 */
export const UserGuard = (req: Request, res: Response, next: any) => {
  // tslint:disable-next-line:no-console
  console.log('Implement like Policy Sample in user, difference is it will just be execute first before validation and policies');
  const errorParams: IGuard = {
    message: 'This Route is not allowed to access',
    name: 'User Guard',
    statusCode: StatusCodes.UNAUTHORIZED
  }; 
  throw new GuardError(errorParams);
  
  next();
}
