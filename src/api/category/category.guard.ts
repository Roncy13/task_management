import { Request } from "express";

/**
 * Example Guard Controller for Smurf
 */
export const CategoryGuard = (req: Request, res: Response, next: any) => {
  // tslint:disable-next-line:no-console
  console.log('Implement like Policy Sample in user, difference is it will just be execute first before validation and policies');

  next();
}
