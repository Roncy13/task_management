import { Request } from "express";

/**
 * Example Policy Controller for Smurf
 */
export const CategoryPolicy = async(req: Request, res: Response, next: any) => {
  
  // Provide throw for your policy error
  next();
}