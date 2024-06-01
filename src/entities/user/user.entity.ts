import { ObjectType, Field, ID } from 'type-graphql';
import { Entity, ObjectId, ObjectIdColumn, Column, BaseEntity } from 'typeorm';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  _id!: ObjectId;

  @Field()
  @Column()
  firstname!: String;

  @Field()
  @Column()
  lastname!: String;

  @Field()
  @Column()
  username!: string;

  @Field()
  @Column('text', { unique: true })
  email!: string;

  @Column()
  password!: string;
}
