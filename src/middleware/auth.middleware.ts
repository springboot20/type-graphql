import { validateToken } from "../utils/jwt";
import { Context } from "../types/context";
import { MiddlewareFn } from "type-graphql";
import { Auth } from "../entities/user/auth.entity";
import { JwtPayload } from "jsonwebtoken";

export const isAuth: MiddlewareFn<Context> = async ({ context: { req } }, next) => {
  const token = req.cookies?.access_token;

  if (!token) {
    throw new Error("not authenticated");
  }

  try {
    const decodedToken = validateToken(
      token,
      process.env.JWT_ACCESS_SECRET as string
    ) as JwtPayload;

    req.user = decodedToken as Auth;

    return next();
  } catch (error: any) {
    throw error;
  }
};
