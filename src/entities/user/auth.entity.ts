import { Roles } from "../../types/roles";
import { Field, ID, ObjectType, Root } from "type-graphql";
import {
  Entity,
  ObjectId,
  ObjectIdColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@ObjectType()
@Entity()
export class Auth extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  _id!: ObjectId;

  @Field()
  @Column()
  // @MaxLength({})
  firstname!: string;

  @Field()
  @Column()
  lastname!: string;

  @Field()
  @Column("enum", { enum: Roles })
  role!: Roles.USER;

  @Field()
  username(@Root() parent: Auth): string {
    return `${parent.firstname} ${parent.lastname}`;
  }

  @Field()
  @Column("text", { unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field(() => User)
  @Column()
  userId!: ObjectId;

  @Field()
  @Column()
  refresh_token!: string;

  @Field()
  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}
