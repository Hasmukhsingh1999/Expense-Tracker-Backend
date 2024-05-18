import { User } from "../models/user-model.js";

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    next(error);
  }
};

export { getAllUser };
