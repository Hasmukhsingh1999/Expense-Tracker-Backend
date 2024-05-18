import { mergeTypeDefs } from "@graphql-tools/merge";
import { userTypeDefs } from "./user-typeDef.js";
import { todoTypeDefs } from "./todo-typeDef.js";

const mergedTypeDefs = mergeTypeDefs([userTypeDefs, todoTypeDefs]);

export { mergedTypeDefs };
