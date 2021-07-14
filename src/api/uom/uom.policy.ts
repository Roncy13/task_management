import { Request, Response } from "express";
import PolicyError from '@core/policy.error';
import IPolicy from '@error-handling/ipolicy.interface';

/**
 * Example Policy Controller for Smurf
 */
export const UomPolicy = async(req: Request, res: Response, next: any) => {
  
  if (req.body.name === "CS 1") {
    const error: IPolicy = {
      message: "Name is CS",
      errors: null,
      name: "Uom Policy"
    };
    const errPolicy = new PolicyError(error);
    return next(errPolicy);
  }
  // Provide throw for your policy error
  next();
}