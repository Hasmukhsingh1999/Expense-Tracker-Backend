import express from "express";
import cors from "cors";
import morgan from "morgan";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const typeDefs = `
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

const resolvers = {
  Todo: {
    user: async (todo) => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${todo.userId}`
      );
      return response.data;
    },
  },
  Query: {
    getTodos: async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      return response.data;
    },
    getAllUsers: async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      return response.data;
    },
    getUser: async (_, { id }) => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      return response.data;
    },
  },
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // Enable introspection
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(morgan("dev"));

  await server.start();
  app.use("/graphql", expressMiddleware(server));

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
}

startServer();
