import { Todo } from "../../entities/todo/todo.entity";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../../middleware/auth.middleware";
import { TodoInput } from "../todo.input";
import { TodoResponse } from "../../entities/graphql/response/todo.entity";
import { Context } from "../../types/context";
import { Auth } from "../../entities/user/auth.entity";

@Resolver(Todo)
export class TodoResolver {
  @Mutation(() => TodoResponse)
  @UseMiddleware(isAuth)
  async createTodo(@Arg("input") input: TodoInput, @Ctx() ctx: Context): Promise<TodoResponse> {
    const user = await Auth.findOne(ctx.req.user?._id as any);

    if (!user) {
      return {
        errors: [
          {
            path: "user",
            message: "user not found",
          },
        ],
      };
    }

    const todo = Todo.create({ todo: input.todo });
    todo.save();

    return { todo };
  }
}
