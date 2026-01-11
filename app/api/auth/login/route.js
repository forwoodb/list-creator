import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

connectDB();

export async function POST(req) {
  const res = new NextResponse();
  const body = await req.json();

  const { email, password } = body;
  const user = await User.findOne({ email });

  const match = bcrypt.compare(password, user.password);

  let token;
  if (match) {
    token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
  }

  res.cookies.set("jwt", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 3,
  });

  return res;
}
