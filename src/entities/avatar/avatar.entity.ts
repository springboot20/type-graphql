import { Field, ID, ObjectType } from "type-graphql";
import { Entity, ObjectId, ObjectIdColumn, Column, BaseEntity, OneToOne } from "typeorm";
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

  @Field(() => ID)
  @OneToOne(() => User, (user) => user.avatars)
  @Column("object-id")
  user!: User;
}
