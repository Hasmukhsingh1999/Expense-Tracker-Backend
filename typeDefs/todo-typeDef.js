const todoTypeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    website: String!
  }

  type Todo {
    id: ID!
    title: String!
    completed: Boolean
    user: User
    userId:ID!
  }

  type Query {
    getTodos: [Todo]
    getAllUsers: [User]
    getUser(id: ID!): User
  }
`;

export { todoTypeDefs };
