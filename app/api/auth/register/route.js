import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(req) {
  const res = new NextResponse();
  const body = await req.json();
  const { username, email, password } = body;
  const hash = await bcrypt.hash(password, 12);
  const newUser = new User({
    username,
    email,
    password: hash,
  });
  await newUser.save();

  const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookies.set("jwt", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 3,
  });

  return res;
}
