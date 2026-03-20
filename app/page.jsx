import ListNames from "./components/ListNames";
import { connectDB } from "@/app/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Home = async () => {
  connectDB();
  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt-list-creator");
  if (!cookie) {
    redirect("/login");
  }

  return (
    <>
      <ListNames />
    </>
  );
};

export default Home;
