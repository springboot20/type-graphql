import { Field, ID, ObjectType } from "type-graphql";
import { Entity, ObjectId, ObjectIdColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
@ObjectType()
export class UserAvatar extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  _id!: ObjectId;

  @Field()
  @Column()
  url!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.avatars)
  user!: User;
}
