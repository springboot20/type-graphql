import { Field, InputType } from "type-graphql";

@InputType()
export class TodoInput {
  @Field()
  todo!: string;
}
