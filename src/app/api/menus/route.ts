import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Restaurant from "@/models/Restaurant";
import Menu, { IMenu, IMenuItem } from "@/models/Menu";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();

    // Restaurantni topish uchun restaurant_id ni tekshiramiz
    const restaurant = await Restaurant.findById(body.restaurant_id);
    if (!restaurant) {
      return NextResponse.json(
        { success: false, message: "Restaurant not found" },
        { status: 404 }
      );
    }

    // Menu hujjatini topish yoki yaratish
    const existingMenu = await Menu.findOne({
      restaurant_id: body.restaurant_id,
    });

    if (existingMenu) {
      // Agar mavjud menu mavjud bo'lsa, yangi taomlarni tekshiramiz
      for (const item of body.items) {
        if (
          existingMenu.items.some(
            (existingItem: IMenuItem) => existingItem.name === item.name
          )
        ) {
          return NextResponse.json(
            {
              success: false,
              message: `Item '${item.name}' already exists in the menu`,
            },
            { status: 400 }
          );
        }
      }

      // Mavjud menyuga yangi taomlarni qo'shish
      existingMenu.items.push(...body.items);
      await existingMenu.save();

      return NextResponse.json(
        { success: true, data: existingMenu },
        { status: 201 }
      );
    } else {
      // Menu mavjud bo'lmasa, yangi menyu yaratish
      const newMenu: IMenu = await Menu.create({
        restaurant_id: body.restaurant_id,
        items: body.items,
      });

      return NextResponse.json(
        { success: true, data: newMenu },
        { status: 201 }
      );
    }
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
