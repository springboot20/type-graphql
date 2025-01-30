import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
  @Field()
  // @Length(1, 20)
  firstname!: string;

  // @Length(1, 20)
  @Field()
  lastname!: string;

  @Field()
  // IsEmail()
  email!: string;

  @Field()
  // @Length(1, 20)
  password!: string;
}
