const todoTypeDefs = `#graphql
  type User {
    id: ID!
    username: String!
  }

  type Todo {
    id: ID!
    title: String!
    completed: Boolean
    user: User!  # Add the user field to the Todo type
  }

  type Mutation {
    createTodo(input: CreateTodoInput!): Todo
    updateTodo(id: ID!, input: UpdateTodoInput!): Todo
    # deleteTodo(input: DeleteTodoInput!): Todo
  }

  input CreateTodoInput {
    title: String!
    completed: Boolean
  }

  input UpdateTodoInput {
    title: String
    completed: Boolean
  }

  type Query {
    getTodos: [Todo!]
  }
`;

export { todoTypeDefs };
