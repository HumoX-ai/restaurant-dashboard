import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { valid: false, error: "Token topilmadi" },
        { status: 400 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    return NextResponse.json({ valid: true, user: decoded }, { status: 200 });
  } catch (error) {
    console.error("Token tekshirishda xato:", error);
    return NextResponse.json(
      { valid: false, error: "Yaroqsiz token" },
      { status: 401 }
    );
  }
}
