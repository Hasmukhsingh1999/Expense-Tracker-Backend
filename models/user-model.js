import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    address: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      zipcode: {
        type: String,
        match: [/^\d{5}(-\d{4})?$/, "is invalid"],
      },
    },
    phone: {
      type: String,
      // match: [/^\d{10}$/, "is invalid"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
