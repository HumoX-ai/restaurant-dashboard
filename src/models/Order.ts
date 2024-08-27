import mongoose, { Document, Schema } from "mongoose";

export interface IOrderItem {
  menu_item_id: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  customer_id: mongoose.Schema.Types.ObjectId;
  restaurant_id: mongoose.Schema.Types.ObjectId;
  items: IOrderItem[];
  total_price: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  created_at: Date;
  updated_at: Date;
}

const OrderItemSchema: Schema = new Schema({
  menu_item_id: {
    type: Schema.Types.ObjectId,
    ref: "Menu.items",
    required: true,
  },
  quantity: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema({
  customer_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  restaurant_id: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  items: [OrderItemSchema],
  total_price: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
