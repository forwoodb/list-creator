import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";

connectDB();

export async function GET(req) {
  console.log("logout");
  const res = new NextResponse();
  res.cookies.set("jwt-list-creator", "", { maxAge: new Date(0) });

  return res;
}
