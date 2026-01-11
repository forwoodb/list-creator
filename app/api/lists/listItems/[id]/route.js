import { NextResponse } from "next/server";
import ListItem from "@/app/models/ListItem";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/lib/db";
import ListName from "@/app/models/ListName";
import User from "@/app/models/User";

connectDB();

export async function GET(req, { params }) {
  // Get List ID
  const { id } = await params;

  // Get User ID
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  const user = jwt.verify(token, process.env.JWT_SECRET);

  const listItems = await ListItem.find({ listId: id, userId: user._id });
  const listName = await ListName.findOne({ _id: id });
  const userInfo = await User.findOne({ _id: user._id });
  const userName = userInfo.username;
  console.log(listName);
  console.log(userName);

  return NextResponse.json({ listItems, listName, userName });
}

export async function POST(req, { params }) {
  const id = await params;
  const body = await req.json();

  // Get userId from cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  const user = jwt.verify(token, process.env.JWT_SECRET);

  const newItem = new ListItem({ ...id, ...body, userId: user._id });

  await newItem.save();

  return NextResponse.json({ msg: "New List Item" });
}
