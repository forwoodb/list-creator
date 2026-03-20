import ListNames from "./components/ListNames";
import { connectDB } from "@/app/lib/db";
import { cookies } from "next/headers";

const Home = async () => {
  connectDB();
  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt-sd");
  console.log(cookie);

  return (
    <>
      <ListNames />
    </>
  );
};

export default Home;
