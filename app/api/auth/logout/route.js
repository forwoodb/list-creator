import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";

connectDB();

export async function POST(req) {
  const res = new NextResponse();
  res.cookies.set("jwt", "", { maxAge: new Date(0) });
  return res;
}
