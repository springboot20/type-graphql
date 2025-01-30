import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  ObjectId,
  ObjectIdColumn,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserAvatar } from "../avatar/avatar.entity";
import { Todo } from "../todo/todo.entity";
@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  _id!: ObjectId;

  @Field(() => [UserAvatar])
  @OneToMany(() => UserAvatar, (avatar) => avatar.user)
  avatars!: UserAvatar[];

  @Field(() => [Todo])
  @OneToMany(() => Todo, (todo) => todo.user)
  todos!: Todo[];

  @Field()
  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}
