import axios from "axios";
import { User } from "../models/user-model.js";
import { Todo } from "../models/todo-model.js";

const todoResolvers = {
  Query: {
    getTodos: async (_, __, context) => {
      try {
        return await Todo.find();
      } catch (error) {
        console.error("Error fetching todos:", error); // Debugging line
        throw new Error("Failed to fetch todos");
      }
    },
  },
  Mutation: {
    createTodo: async (_, { input }, context) => {
      console.log("Input:", input); // Debugging line

      const { title, completed } = input;

      const newTodo = new Todo({
        title,
        completed: completed ?? false,
      });

      try {
        await newTodo.save(); // Save the newTodo to the database
        console.log("New Todo:", newTodo); // Debugging line
        return newTodo; // Return the newly created Todo
      } catch (error) {
        console.error("Error creating todo:", error); // Debugging line
        throw new Error("Failed to create todo");
      }
    },
  },
};

export { todoResolvers };
