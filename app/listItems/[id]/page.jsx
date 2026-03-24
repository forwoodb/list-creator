import ListItems from "@/app/components/ListItems";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import ListItem from "@/app/models/ListItem";
import ListName from "@/app/models/ListName";
import User from "@/app/models/User";
import { revalidatePath } from "next/cache";

// Get user ID
const getUserId = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt-list-creator");
  const token = cookie.value;
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  const id = verify._id;
  return id;
};

const Page = async ({ params }) => {
  // Get list ID
  const { id } = await params;

  const userId = await getUserId();

  if (!userId) {
    redirect("/login");
  }

  const dataLi = await ListItem.find({ listId: id, userId: userId }).lean();
  const listItems = JSON.parse(JSON.stringify(dataLi));

  const dataLn = await ListName.findOne({ _id: id }).lean();
  const listName = dataLn.listName;

  const userInfo = await User.findOne({ _id: userId }).lean();
  const userName = userInfo.username;

  const createListItem = async (formData) => {
    "use server";
    // console.log(Object.fromEntries(formData));
    const listItem = formData.get("listItem");

    const userId = await getUserId();

    const newItem = new ListItem({ listItem, listId: id, userId });
    await newItem.save();

    revalidatePath(`/listItems/${id}`);
    console.log(newItem);
  };

  return (
    <>
      <ListItems
        listItems={listItems}
        listName={listName}
        userName={userName}
        createListItem={createListItem}
      />
    </>
  );
};

export default Page;
