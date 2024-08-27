import mongoose, { Document, Schema } from "mongoose";

export interface IReview extends Document {
  restaurant_id: mongoose.Schema.Types.ObjectId;
  customer_id: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment?: string;
  created_at: Date;
  updated_at: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    restaurant_id: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    customer_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Review ||
  mongoose.model<IReview>("Review", ReviewSchema);
