import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/User";

@Resolver()
export class UserResolver {
  private data: User[] = [
    { id: "1", name: "Thierry" },
    { id: "2", name: "Paula" },
  ];

  @Query(() => [User])
  async users() {
    return this.data;
  }

  @Mutation(() => User)
  async createUser(@Arg("name") name: string) {
    const user = { id: (this.data.length + 1).toString(), name };

    this.data.push(user);

    return user;
  }
}
