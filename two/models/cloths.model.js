import mongoose from "mongoose";

const clothSchema = new mongoose.Schema(
  {
  name: { type: String, required: true },
  images: [{ type: String, required: true }],
  price: { type: Number, required: true },
  description: { type: String, required: true },
  size: [{ type: String, required: true }],
  discount: Number,
  category: String,
  rating: Number,
  stock: Number,
  tags: [String],
},
 { collection: "cloths" } 
);

const Cloth = mongoose.model("Cloth", clothSchema);
export default Cloth;
