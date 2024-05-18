import axios from "axios";
const todoResolvers = {
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

export { todoResolvers };
