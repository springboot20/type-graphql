import { Resolver, Query, Mutation, Arg, FieldResolver, Root } from 'type-graphql';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user/user.entity';

@Resolver(User)
export class RegisterResolver {
  @Query(() => String)
  async registerText() {
    return 'register query';
  }

  @FieldResolver()
  async username(@Root() parent: User) {
    return `${parent.firstname} ${parent.lastname}`;
  }

  @Mutation(() => User)
  async register(
    @Arg('firstname') firstname: string,
    @Arg('lastname') lastname: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await user.save();

    return user;
  }
}
