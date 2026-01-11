import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import ListName from "@/app/models/ListName";

connectDB();

export async function POST(req) {
  // Get form data
  const { listName } = await req.json();

  // Get user ID from cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  const user = jwt.verify(token, process.env.JWT_SECRET);

  // Add new list name with user ID
  const newList = new ListName({ listName, userId: user._id });
  // console.log(newList);

  await newList.save();

  return NextResponse.json(newList);
}

export async function GET() {
  // Get user ID from cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }
  const user = jwt.verify(token, process.env.JWT_SECRET);
  // Get list names with user ID
  const listNames = await ListName.find({ userId: user._id });

  return NextResponse.json({ userName: user.username, listNames });
}
