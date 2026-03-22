import ListNames from "./components/ListNames";
import { connectDB } from "@/app/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import ListName from "./models/ListName";
import { revalidatePath } from "next/cache";

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
  const user = jwt.verify(token, process.env.JWT_SECRET);

  // Get list names with user ID
  const data = await ListName.find({ userId: user._id }).lean();
  const listNames = JSON.parse(JSON.stringify(data));

  // Create New List
  const createList = async (formData) => {
    "use server";

    const listName = formData.get("listName");

    // Get user ID from cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt-list-creator")?.value;
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const newList = new ListName({ listName, userId: user._id });

    await newList.save();

    revalidatePath("/");
  };

  const deleteList = async (id) => {
    "use server";
    await ListName.findByIdAndDelete(id);
    revalidatePath("/");
  };

  const updateList = async (list) => {
    "use server";
    console.log(list);
  };

  return (
    <>
      <ListNames
        listNames={listNames}
        createList={createList}
        deleteList={deleteList}
        updateList={updateList}
      />
    </>
  );
};

export default Home;
