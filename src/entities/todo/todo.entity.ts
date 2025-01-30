import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../user/user.entity";

@ObjectType()
@Entity()
export class Todo extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  _id!: ObjectId;

  @Field()
  @Column()
  todo!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.todos)
  user!: User;

  @Field()
  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}
