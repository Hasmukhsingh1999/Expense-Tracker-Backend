import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "./user-resolver.js";
import { todoResolvers } from "./todo-resolver.js";
// import { userTypeDefs } from "../typeDefs/user-typeDef.js";

const mergedResolvers = mergeResolvers([userResolvers, todoResolvers]);

export { mergedResolvers };
