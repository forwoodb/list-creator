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
    setUpdate(item.listName);
  };

  const updateListName = (item) => {
    const updateName = {
      _id: item._id,
      listName: update,
    };

    console.log(item);

    fetch(`/api/lists/listNames/${item._id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateName),
    });

    setListNames(
      listNames.map((name) => {
        if (name._id === updateName._id) {
          name = updateName;
        }
        return name;
      }),
    );

    setEdit("");
    setUpdate("");
  };

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
        <Button click={handleLogout}>Log Out</Button>
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
                  <input
                    type="text"
                    value={update}
                    onChange={(e) => setUpdate(e.target.value)}
                    className="bg-white"
                  />
                  <Button onClick={() => updateListName(listName)} border>
                    Update
                  </Button>
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
                    <Button click={() => editListName(listName)} border>
                      Edit
                    </Button>
                    <Button
                      click={() => deleteList(listName._id)}
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
