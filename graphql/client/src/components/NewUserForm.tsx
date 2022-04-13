import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { GET_USERS } from "../App";
import { client } from "../lib/apollo";

const CREATE_USER = gql`
  mutation ($name: String!) {
    createUser(name: $name) {
      name
    }
  }
`;

export function NewUserForm() {
  const [name, setName] = useState("");
  const [createUser, { data }] = useMutation(CREATE_USER);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!name) {
      return;
    }

    await createUser({
      variables: {
        name,
      },
      // refetchQueries: [GET_USERS]
      update: (cache, { data: { createUser } }) => {
        const { users } = client.readQuery({ query: GET_USERS });

        cache.writeQuery({
          query: GET_USERS,
          data: {
            users: [...users, createUser],
          },
        });
      },
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}
