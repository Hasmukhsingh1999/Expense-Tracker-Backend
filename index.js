import express from 'express';
import cors from 'cors'
import morgan from 'morgan'

import dotenv from 'dotenv'
import { ApolloServer } from "@apollo/server";
import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { connectDatabase } from './database/connect-db.js';

dotenv.config()

const app = express()


await connectDatabase()
app.use(express());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan("tiny"))


const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer: app })]
});


// await server.start()
await server.start()

app.use(
  '/',
  cors(),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req }) => ({ req }),
  }),
);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}`);
});
