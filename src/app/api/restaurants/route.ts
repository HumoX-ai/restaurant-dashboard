import { NextResponse } from "next/server";
import Restaurant, { IRestaurant } from "@/models/Restaurant";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET() {
  await dbConnect().then(() => console.log("Connected to database"));

  try {
    const restaurants: IRestaurant[] = await Restaurant.find({});
    return NextResponse.json(
      { success: true, data: restaurants },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 400 });
  }
}

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();

    const ownerId = body.owner_id;

    // Ownerni topish
    const owner = await User.findById(ownerId);
    if (!owner) {
      return NextResponse.json(
        { success: false, message: "Owner not found" },
        { status: 404 }
      );
    }

    const newRestaurant: IRestaurant = await Restaurant.create({
      name: body.name,
      owner_id: body.owner_id,
      location: body.location,
      description: body.description,
      open_hours: body.open_hours,
    });

    const restaurant: IRestaurant = await Restaurant.create(newRestaurant);
    return NextResponse.json(
      { success: true, data: restaurant },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 400 });
  }
}
