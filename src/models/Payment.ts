import mongoose, { Document, Schema } from "mongoose";

export interface IPayment extends Document {
  order_id: mongoose.Schema.Types.ObjectId;
  amount: number;
  status: "pending" | "completed" | "failed";
  method: string;
  created_at: Date;
}

const PaymentSchema: Schema = new Schema({
  order_id: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  method: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.Payment ||
  mongoose.model<IPayment>("Payment", PaymentSchema);
