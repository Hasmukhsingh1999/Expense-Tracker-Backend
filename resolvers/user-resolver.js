import { User } from "../models/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET_KEY = process.env.SECRET_TOKEN

const userResolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    authUser: async (_, __, { user }) => {
      if (!user) throw new Error("You are not authenticated");
      return await User.findById(user.id);
    },
    user: async (_, { userId }) => {
      return await User.findById(userId);
    },
  },
  Mutation: {
    signUp: async (_, { input }) => {
      const { name, username, email, password, gender, address, phone } = input;
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        name,
        username,
        email,
        password: hashedPassword,
        gender,
        address,
        phone,
      });

      const result = await newUser.save();
      const token = jwt.sign(
        { id: result._id, email: result.email },
        SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      return {
        ...result._doc,
        id: result._id,
        token,
      };
    },
    signIn: async (_, { input }) => {
      const { email, password } = input;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found!");
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Password is incorrect");
      }

      const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
        expiresIn: "1h",
      });

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    logout: async () => {
      return { message: "Logged out successfully" };
    },
  },
};

export { userResolvers };
