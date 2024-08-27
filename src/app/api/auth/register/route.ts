import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User, { IUser } from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: Request) {
  await dbConnect().then(() => console.log("Connected to database"));

  try {
    const body = await req.json();

    // Parolni hash qilish
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser: IUser = await User.create({
      username: body.username,
      name: body.name,
      phone: body.phone,
      password: hashedPassword,
      role: body.role || "customer",
      address: body.address,
    });

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}
