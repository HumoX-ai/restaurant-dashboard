import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  password: string;
  role: "admin" | "restaurant_owner" | "customer";
  address?: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    phone: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "restaurant_owner", "customer"],
      default: "customer",
    },
    address: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
