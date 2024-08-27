import mongoose, { Document, Schema } from "mongoose";

export interface IRestaurant extends Document {
  name: string;
  owner_id: mongoose.Schema.Types.ObjectId;
  location?: string;
  description?: string;
  open_hours?: string;
  created_at: Date;
  updated_at: Date;
}

const RestaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    owner_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    location: { type: String },
    description: { type: String },
    open_hours: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Restaurant ||
  mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);
