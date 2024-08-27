import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Menu from "@/models/Menu";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const menuId = params.id;

    const menu = await Menu.findOne({ restaurant_id: menuId }).populate(
      "restaurant_id"
    );

    if (!menu) {
      return NextResponse.json(
        { success: false, message: "Menu not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: menu }, { status: 200 });
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
