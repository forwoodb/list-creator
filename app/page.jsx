import ListNames from "./components/ListNames";
import { connectDB } from "@/app/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import ListName from "./models/ListName";
import { revalidatePath } from "next/cache";
import User from "./models/User";

const Home = async () => {
  connectDB();

  // Authorize user
  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt-list-creator");

  if (!cookie) {
    redirect("/login");
  }

  // Get User ID
  const token = cookieStore.get("jwt-list-creator")?.value;
  const verify = jwt.verify(token, process.env.JWT_SECRET);

  // Get list names with user ID
  const data = await ListName.find({ userId: verify._id }).lean();
  const listNames = JSON.parse(JSON.stringify(data));

  // Get Username
  const user = await User.findOne({ _id: verify._id }).lean();
  const username = user.username;
  console.log(username);

  // Create New List
  const createList = async (formData) => {
    "use server";

    const listName = formData.get("listName");

    // Get user ID from cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt-list-creator")?.value;
    const verify = jwt.verify(token, process.env.JWT_SECRET);

    const newList = new ListName({ listName, userId: verify._id });

    await newList.save();

    revalidatePath("/");
  };

  const deleteList = async (id) => {
    "use server";
    await ListName.findByIdAndDelete(id);
    revalidatePath("/");
  };

  const updateList = async (formData) => {
    "use server";
    // console.log(formData.get("_id"));

    const _id = formData.get("_id");
    const listName = formData.get("listName");
    await ListName.findByIdAndUpdate(_id, { _id, listName });
    revalidatePath("/");
  };

  return (
    <>
      <ListNames
        listNames={listNames}
        username={username}
        createList={createList}
        deleteList={deleteList}
        updateList={updateList}
      />
    </>
  );
};

export default Home;
