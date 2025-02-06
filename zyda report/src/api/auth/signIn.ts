const createPayload = (email: string, password: string) => {
  return {
    operationName: "SignIn",
    variables: {
      email: email,
      password: password,
    },
    query:
      "mutation SignIn($email: String!, $password: String!) {\n  signIn(email: $email, password: $password) {\n    id\n    name\n    email\n    phoneNumber\n    accessToken\n    createdAt\n    __typename\n  }\n}",
  };
};

export type PayloadType = {
  email: string;
  password: string;
};

export type ResponseType = {
  data: Data;
};

type Data = {
  signIn: SignIn;
};

type SignIn = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  accessToken: string;
  createdAt: string;
  __typename: string;
};

export const exec = ({ email, password }: PayloadType) => {
  return fetch("https://graphql-dash-wrapper.stellate.sh/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createPayload(email, password)),
  });
};
