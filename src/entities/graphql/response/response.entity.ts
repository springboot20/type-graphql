import { Auth } from "../../user/auth.entity";
import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../error/error.entity";

@ObjectType()
export class AuthResponse {
  @Field(() => Auth, { nullable: true })
  auth?: Auth;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

