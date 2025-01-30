import { NextFunction, Request, Response } from "express";
import { ObjectId } from "typeorm";

declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

export interface User {
  _id: string | ObjectId;
  email: string;
  username: string | any;
  role?: string;
}

interface CustomRequest extends Request {
  user?: User;
}

export interface Context {
  req: CustomRequest;
  res: Response;
  next: NextFunction;
}
