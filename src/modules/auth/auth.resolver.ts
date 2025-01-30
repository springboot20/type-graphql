import { Auth } from "../../entities/user/auth.entity";
import { Arg, Mutation, Resolver, Ctx, Query, UseMiddleware } from "type-graphql";
import bcrypt from "bcrypt";
import { Context } from "../../types/context";
import { generateTokens } from "../../utils/jwt";
import { RegisterInput } from "../register.input";
import { isAuth } from "../../middleware/auth.middleware";
import { Roles } from "../../types/roles";
import { AuthResponse } from "../../entities/graphql/response/response.entity";

@Resolver(Auth)
export class AuthResolver {
  @Mutation(() => AuthResponse, { nullable: true })
  async register(
    @Arg("input") { email, firstname, lastname, password }: RegisterInput
  ): Promise<AuthResponse> {
    try {
      // Await the database query
      const existedUser = await Auth.findOne({ where: { email } });
      console.log("Found existing user:", existedUser); // Debugging
      // If user already exists, return an error
      if (existedUser) {
        return {
          errors: [
            {
              path: "email",
              message: "User already exists",
            },
          ],
        };
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      const auth = Auth.create({
        firstname,
        lastname,
        email,
        role: Roles.USER,
        password: hashedPassword,
      });

      await auth.save();

      return { auth };
    } catch (error) {
      console.error("Error registering user:", error);
      return {
        errors: [{ path: "register", message: "Failed to create user" }],
      };
    }
  }

  @Mutation(() => AuthResponse, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: Context
  ): Promise<AuthResponse> {
    const auth = await Auth.findOne({ where: { email } });

    if (!auth) {
      return {
        errors: [
          {
            path: "email",
            message: "users already exits",
          },
        ],
      };
    }

    const comparePassword = await bcrypt.compare(password, auth?.password!);

    if (!comparePassword) {
      return {
        errors: [
          {
            path: "password",
            message: "incorrect password",
          },
        ],
      };
    }

    const req_user = {
      _id: auth?._id,
      username: `${auth?.firstname} ${auth?.lastname}`,
      email: auth?.email,
      role: auth?.role,
    };

    const tokens = await generateTokens(req_user?._id?.toString());

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    ctx.res.cookie("access_token", tokens?.accessToken, options);
    ctx.res.cookie("refresh_token", tokens?.refreshToken, options);

    return { auth: auth! };
  }

  @Query(() => AuthResponse, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() ctx: Context) {
    console.log(ctx.req.cookies);
    const auth = await Auth.findOne(ctx.req.user?._id as any);
    return { auth };
  }
}
