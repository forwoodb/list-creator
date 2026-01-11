import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";
import ListItem from "@/app/models/ListItem";

connectDB();

export async function GET(req, { params }) {
  const itemIds = await params;
  await ListItem.findByIdAndDelete({ _id: itemIds.itemId });
  return NextResponse.json({ msg: "placeholder" });
}
