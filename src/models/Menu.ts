import mongoose, { Document, Schema } from "mongoose";

export interface IMenuItem {
  name: string;
  description?: string;
  price: number;
  category?: string;
  available: boolean;
}

export interface IMenu extends Document {
  restaurant_id: mongoose.Schema.Types.ObjectId;
  items: IMenuItem[];
  created_at: Date;
  updated_at: Date;
}

const MenuItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  available: { type: Boolean, default: true },
});

const MenuSchema: Schema = new Schema(
  {
    restaurant_id: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    items: [MenuItemSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Menu ||
  mongoose.model<IMenu>("Menu", MenuSchema);
