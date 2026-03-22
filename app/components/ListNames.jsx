"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "./Button";
import AddForm from "./AddForm";
import AppContainer from "./AppContainer";

const ListNames = ({ listNames, createList, deleteList, updateList }) => {
  const [edit, setEdit] = useState("");
  const [update, setUpdate] = useState("");
  const [userName, setUserName] = useState("");

  const router = useRouter();

  const editListName = (item) => {
    setEdit(item._id);
    console.log(item);

    setUpdate(item);
  };

  // const updateListName = (item) => {
  //   const updateName = {
  //     _id: item._id,
  //     listName: update,
  //   };

  //   console.log(item);

  //   fetch(`/api/lists/listNames/${item._id}`, {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(updateName),
  //   });

  //   setListNames(
  //     listNames.map((name) => {
  //       if (name._id === updateName._id) {
  //         name = updateName;
  //       }
  //       return name;
  //     }),
  //   );

  //   setEdit("");
  //   setUpdate("");
  // };

  const handleLogout = async () => {
    await fetch("/api/auth/logout");
    router.push("/login");
  };

  return (
    <AppContainer>
      <h2
        className="
        text-center 
        text-6xl 
        text-gray-200
        "
      >
        List Names
      </h2>
      <div
        className="
          text-wrapper
          flex
          justify-between
          py-1
          "
      >
        <p>Hello {userName}</p>
        <Button onClick={handleLogout}>Log Out</Button>
      </div>
      <AddForm mode={"listName"} submit={createList} />
      <div className="w-full">
        <h2>List Names</h2>
        <div className="m-auto">
          {listNames.map((listName) => {
            if (listName._id === edit) {
              return (
                <div
                  key={listName._id}
                  className="
                  flex
                  justify-between
                  align-middle
                  max-w-lg
                  p-2.5
                  mx-auto
                  my-2.5 
                  bg-gray-200 
                  rounded
                  "
                >
                  <form
                    action={async (formData) => {
                      updateList(formData);
                      setEdit("");
                    }}
                    className="flex justify-between w-full"
                  >
                    <input
                      type="hidden"
                      name="_id"
                      value={update._id}
                      className="bg-white"
                    />
                    <input
                      type="text"
                      name="listName"
                      defaultValue={update.listName}
                      className="bg-white"
                    />
                    <Button border>Update</Button>
                  </form>
                </div>
              );
            } else {
              return (
                <div
                  key={listName._id}
                  className="
                  flex
                  justify-between
                  align-middle
                  max-w-lg
                  p-2.5
                  mx-auto
                  my-2.5 
                  bg-gray-200 
                  rounded
                  "
                >
                  <Link href={`/listItems/${listName._id}`}>
                    {listName.listName}
                  </Link>
                  <div className="buttons">
                    <Button onClick={() => editListName(listName)} border>
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteList(listName._id)}
                      className={"bg-red-700 text-white"}
                      border
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </AppContainer>
  );
};

export default ListNames;
