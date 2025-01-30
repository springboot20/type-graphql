import { Context } from "../../types/context";
import { Ctx, Mutation, Resolver } from "type-graphql";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context): Promise<Boolean> {
    try {
      ctx.res.clearCookie("refresh_token", { httpOnly: true, secure: true });
      ctx.res.clearCookie("access_token", { httpOnly: true, secure: true });

      return true; // Indicate logout was successful
    } catch (error) {
      console.error("Logout Error:", error);
      return false;
    }
  }
}
