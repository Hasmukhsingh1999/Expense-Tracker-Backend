import express from "express";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { buildContext } from "graphql-passport";
import dotenv from "dotenv";
import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import { connectDatabase } from "./database/connect-db.js";
import { configurePassport } from "./passport/passport-config.js";

dotenv.config();
configurePassport();

// Create Express app
const app = express();

// Connect to MongoDB
await connectDatabase();

// Configure MongoDB session store
const MongoDBStore = connectMongo(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});
store.on("error", (err) => console.log(err));

// Express middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, //this option specifies whether to save the session to the store on every request
    saveUninitialized: false,
    cookie: {
      maxAge: process.env.EXPIRES,
      httpOnly: true,
      secure: true,
    },
    store: store,
  })
);

// Apollo Server setup
const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer: app })],
});

// Start Apollo Server
await server.start();

// Apply Apollo Server middleware to Express app
app.use(
  "/",
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
  }),
  express.json(),
  express.urlencoded({ extended: true }),
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  })
);

// Start Express server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}`);
});
