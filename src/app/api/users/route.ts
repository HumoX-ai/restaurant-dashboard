import dbConnect from "@/lib/dbConnect";
import User, { IUser } from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect().then(() => console.log("Connected to database"));
  try {
    const users: IUser[] = await User.find({});
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 400 });
  }
}
