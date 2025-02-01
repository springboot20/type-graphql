import { Auth } from "../../user/auth.entity";
import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../error/error.entity";
import { User } from "../../user/user.entity";

@ObjectType()
export class AuthResponse {
  @Field(() => Auth, { nullable: true })
  auth?: Auth;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
