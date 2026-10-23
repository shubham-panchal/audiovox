import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    colors: { type: [String], default: [] },
    newArrivalOrder: { type: Number, min: 1 },
    newArrivalBadge: { type: String },
    bestSellerOrder: { type: Number, min: 1 },
    bestSellerBadge: { type: String },
  },
  { timestamps: true },
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
