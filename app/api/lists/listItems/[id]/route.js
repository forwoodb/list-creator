import { NextResponse } from "next/server";
import ListItem from "@/app/models/ListItem";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/lib/db";
import ListName from "@/app/models/ListName";
import User from "@/app/models/User";

connectDB();

export async function POST(req, { params }) {
  const id = await params;
  const body = await req.json();

  // Get userId from cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt-list-creator")?.value;
  const verify = jwt.verify(token, process.env.JWT_SECRET);

  const newItem = new ListItem({ ...id, ...body, userId: verify._id });

  await newItem.save();

  return NextResponse.json({ msg: "New List Item" });
}
