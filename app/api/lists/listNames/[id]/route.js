import ListName from "@/app/models/ListName";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;

  await ListName.findByIdAndDelete(id);

  return NextResponse.json({ msg: "delete" });
}

export async function POST(req, { params }) {
  const { _id, listName } = await req.json();
  await ListName.findByIdAndUpdate(_id, { _id, listName });
  return NextResponse.json({ msg: "update" });
}
