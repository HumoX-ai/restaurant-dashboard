import dbConnect from "@/lib/dbConnect";
import Restaurant from "@/models/Restaurant";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect().then(() => console.log("Connected to database"));
  try {
    const restaurantId = params.id;
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return NextResponse.json(
        { success: false, message: "Restaurant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: restaurant },
      { status: 200 }
    );
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
