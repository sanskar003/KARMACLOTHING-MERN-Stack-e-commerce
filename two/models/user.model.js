import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zipcode: { type: String, required: false },
    phone: { type: String, required: false },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
      default: null,
    },
    address:{
        type: addressSchema,
        default: {}
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
