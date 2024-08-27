import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User, { IUser } from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: Request) {
  await dbConnect().then(() =>
    console.log("Ma'lumotlar bazasiga ulanish o'rnatildi")
  );

  try {
    // JWT tokenni olish (Masalan, Authorization headeridan)
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Token topilmadi" },
        { status: 401 }
      );
    }

    // Tokenni dekod qilish va foydalanuvchi ma'lumotlarini olish
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret"
    ) as { id: string; role: string };

    // Foydalanuvchini topish va barcha ma'lumotlarini olish
    const user: IUser | null = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Foydalanuvchi topilmadi" },
        { status: 404 }
      );
    }

    // Foydalanuvchi ma'lumotlarini qaytarish
    return NextResponse.json({ success: true, data: user }, { status: 200 });
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
