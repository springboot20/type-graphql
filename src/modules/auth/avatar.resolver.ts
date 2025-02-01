import { UserAvatar } from "../../entities/avatar/avatar.entity";
import { Arg, Resolver, Mutation } from "type-graphql";
import { GraphQLUpload, FileUpload } from "graphql-upload-ts";
import * as fs from "fs/promises";

@Resolver(() => UserAvatar)
export class AvatarResolver {
  @Mutation(() => UserAvatar)
  async uploadUserAvatar(@Arg("file", () => GraphQLUpload) file: FileUpload): Promise<any> {
    try {
      const { createReadStream } = file;

      const stream = createReadStream();
      const chunks: any[] = [];

      let buffer = await new Promise<Buffer>((resolve, reject) => {
        let buffer: Buffer;

        stream.on("data", function (chunk) {
          chunks.push(chunk);
        });

        stream.on("end", function () {
          buffer = Buffer.concat(chunks);
          resolve(buffer);
        });

        stream.on("error", reject);
      });

      await fs.writeFile("upload.jpg", buffer as any);

      return buffer.length;
    } catch (err) {
      return 0;
    }
  }
}
