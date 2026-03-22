import ListItems from "@/app/components/ListItems";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import ListItem from "@/app/models/ListItem";
import ListName from "@/app/models/ListName";
import User from "@/app/models/User";

const Page = async ({ params }) => {
  // Get list ID
  const { id } = await params;

  // Get user ID
  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt-list-creator");

  if (!cookie) {
    redirect("/login");
  }

  const token = cookie.value;
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  const userId = verify._id;

  const dataLi = await ListItem.find({ listId: id, userId: userId }).lean();
  const listItems = JSON.parse(JSON.stringify(dataLi));

  const dataLn = await ListName.findOne({ _id: id }).lean();
  const listName = dataLn.listName;
  console.log(listName);

  const userInfo = await User.findOne({ _id: userId }).lean();
  const userName = userInfo.username;

  return (
    <>
      <ListItems
        listItems={listItems}
        listName={listName}
        userName={userName}
      />
    </>
  );
};

export default Page;
