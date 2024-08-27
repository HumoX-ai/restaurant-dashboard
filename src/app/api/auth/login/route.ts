import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: Request) {
  await dbConnect().then(() =>
    console.log("Ma'lumotlar bazasiga ulanish o'rnatildi")
  );

  try {
    const { phone, password } = await req.json();

    // Foydalanuvchini topish
    const user: IUser | null = await User.findOne({ phone });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Raqam yoki parol noto'g'ri" },
        { status: 401 }
      );
    }

    // Kiritilgan parolni hashlangan parol bilan taqqoslash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: "Raqam yoki parol noto'g'ri" },
        { status: 401 }
      );
    }

    // JWT token yaratish
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" } // Token 7 kunda tugaydi
    );

    // Tokenni cookie-da saqlashingiz yoki javobda qaytarishingiz mumkin
    return NextResponse.json(
      {
        success: true,
        token,
        user: { id: user._id, phone: user.phone, role: user.role },
      },
      { status: 200 }
    );
  } catch (error) {
    let errorMessage = "Noma'lum xato yuz berdi";

    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
