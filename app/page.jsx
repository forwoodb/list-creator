import ListNames from "./components/ListNames";
import { connectDB } from "@/app/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import ListName from "./models/ListName";

const Home = async () => {
  connectDB();
  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt-list-creator");

  if (!cookie) {
    redirect("/login");
  }

  const token = cookieStore.get("jwt-list-creator")?.value;

  if (!token) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }
  const user = jwt.verify(token, process.env.JWT_SECRET);
  // Get list names with user ID
  const listNames = await ListName.find({ userId: user._id });

  return (
    <>
      <ListNames listNames={listNames} />
    </>
  );
};

export default Home;
