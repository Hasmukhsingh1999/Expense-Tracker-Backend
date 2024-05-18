import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "./user-resolver.js";
import { userTypeDefs } from "../typeDefs/user-typeDef.js";

const mergedResolvers = mergeResolvers([userResolvers, userTypeDefs]);

export { mergedResolvers };
