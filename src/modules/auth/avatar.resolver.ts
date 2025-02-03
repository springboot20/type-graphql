import { UserAvatar } from "../../entities/avatar/avatar.entity";
import { Arg, Resolver, Mutation, Ctx, UseMiddleware } from "type-graphql";
import { GraphQLUpload, FileUpload } from "graphql-upload-ts";
import { isAuth } from "../../middleware/auth.middleware";
import { User } from "../../entities/user/user.entity";
import { uploadFileToCloudinary } from "../../configs/cloudinary.config";
import { Context } from "../../types/context";

@Resolver(() => UserAvatar)
export class AvatarResolver {
  @Mutation(() => UserAvatar)
  @UseMiddleware(isAuth)
  async uploadUserAvatar(
    @Arg("file", () => GraphQLUpload) file: FileUpload,
    @Ctx() ctx: Context
  ): Promise<UserAvatar> {
    try {
      const userId = ctx.req.user?._id; // Get logged-in user's ID from the context
      if (!userId) throw Error("Unauthorized");

      const uploadedFile = await uploadFileToCloudinary(file, "avatars");

      // Save in DB
      const user = await User.findOneOrFail(userId as any);

      const avatar = new UserAvatar();
      avatar.url = uploadedFile.secure_url;
      avatar.user = user;
      await avatar.save();

      return avatar;
    } catch (err) {
      console.error(err);
      throw Error("File upload failed");
    }
  }
}
