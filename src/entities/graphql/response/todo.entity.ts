import { Field, ObjectType } from "type-graphql";
import { Todo } from "../../todo/todo.entity";
import { FieldError } from "../error/error.entity";

@ObjectType()
export class TodoResponse {
  @Field(() => [Todo], { nullable: true })
  todos?: Todo[];

  @Field(() => Todo, { nullable: true })
  todo?: Todo;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
