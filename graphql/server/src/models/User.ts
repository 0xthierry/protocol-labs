import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  
  @Field(_ => ID)
  id: string;

  @Field()
  name: string;

}