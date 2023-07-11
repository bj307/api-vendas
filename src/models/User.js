import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: String,
  password: String,
});

export default model("User", UserSchema);
