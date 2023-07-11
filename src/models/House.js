import { Schema, model } from "mongoose";

const HouseSchema = new Schema({
  thumb: String,
  desc: String,
  price: Number,
  local: String,
  status: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default model("House", HouseSchema);
