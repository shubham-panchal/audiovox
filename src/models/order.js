import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    variant: { type: String, default: null },
    quantity: { type: Number, required: true, min: 1 },
    unitPriceCents: { type: Number, required: true, min: 0 },
    lineTotalCents: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    customerName: { type: String, required: true, trim: true },
    customerEmail: { type: String, required: true, trim: true, lowercase: true },
    items: { type: [orderItemSchema], required: true },
    subtotalCents: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, enum: ["USD"], default: "USD" },
    status: { type: String, required: true, enum: ["demo"], default: "demo" },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["not_required"],
      default: "not_required",
    },
  },
  { timestamps: true },
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
