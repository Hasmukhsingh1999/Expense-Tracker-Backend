import { users } from "../dummy-data/data.js";

const transactionResolver = {
  Query: {
    users: () => {
      return users;
    },
  },
  Mutation: {},
};

export default transactionResolver;
