import jwt from "jsonwebtoken";
import { User } from "../models/user-model.js";

const context = ({ req }) => {
  const token = req.headers.authorization || "";
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
      const user = User.findById(decodedToken.id);
      return { user };
    } catch (error) {
      console.error("Invalid token");
    }
  }
  return {};
};

export { context };
