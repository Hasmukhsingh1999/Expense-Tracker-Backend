import express from "express";
import cors from "cors";
import morgan from "morgan";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
      type User{
        id:ID!
        name:String!
        username:String!
        email:String!
        
        website:String!
       
      }
      type Todo {
        id: ID!
        title: String!
        completed: Boolean
      }

      type Query {
        getTodos: [Todo]
        getAllUsers :[User]
        getUser(id:ID!):User
      }

    `,
    resolvers: {
      Query: {
        getTodos: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
        getAllUsers: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
        getUser: async (_, { id }) =>
          (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`))
            .data,
      },
    },
    introspection: true, // Enable introspection
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(morgan("dev"));

  await server.start();
  app.use("/graphql", expressMiddleware(server));

  app.listen(process.env.PORT, () =>
    console.log(`Server started at PORT: ${process.env.PORT}`)
  );
}

startServer();
