import "reflect-metadata";
import { UserAvatar } from "./../entities/avatar/avatar.entity";
import { Auth } from "../entities/user/auth.entity";
import { Todo } from "../entities/todo/todo.entity";
import { User } from "../entities/user/user.entity";
import { DataSource } from "typeorm";

const url =
  process.env.NODE_ENV === "production"
    ? `mongodb+srv://springboot:${process.env.PASSWORD}@cluster0.prjuarl.mongodb.net/typeorm?retryWrites=true&w=majority`
    : process.env.MONGODB_URI_LOCAL;

export const AppDataSource = new DataSource({
  type: "mongodb",
  url,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  logging: true,
  synchronize: true,
  entities: [Auth, UserAvatar, User, Todo],
});
