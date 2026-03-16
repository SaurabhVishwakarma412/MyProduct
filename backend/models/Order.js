import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String,
  items: Array,
  total: Number
});

export default mongoose.model("Order", orderSchema);