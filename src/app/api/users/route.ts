import dbConnect from "@/lib/dbConnect";
import User, { IUser } from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();
  const url = new URL(request.url);
  const name = url.searchParams.get("name");
  const phone = url.searchParams.get("phone");
  const roles = url.searchParams.get("roles")?.split(",");

  let query: any = {};
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }
  if (phone) {
    query.phone = { $regex: phone, $options: "i" };
  }
  if (roles && roles.length > 0) {
    query.role = { $in: roles };
  }

  try {
    const users: IUser[] = await User.find(query);
    return NextResponse.json({ success: true, data: users }, { status: 200 });
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
