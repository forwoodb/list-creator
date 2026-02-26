"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import AddForm from "@/app/components/AddForm";
import Button from "@/app/components/Button";
import AppContainer from "@/app/components/AppContainer";

const ListItems = () => {
  // Get List Name ID from URL
  const params = useParams();
  const listId = params.id;

  const [listItems, setListItems] = useState([]);
  const [newItem, setNewItem] = useState({ listItem: "", listId });
  const [editItem, setEditItem] = useState("");
  const [updateItem, setUpdateItem] = useState("");
  const [listName, setListName] = useState("");
  const [userName, setUserName] = useState("");

  const fetchItems = () => {
    fetch(`/api/lists/listItems/${listId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.listName.listName);

        setListItems(data.listItems);
        setListName(data.listName.listName);
        setUserName(data.userName);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewItem((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(newItem);

    await fetch(`/api/lists/listItems/${listId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newItem),
    });

    fetchItems();
    setNewItem({ listItem: "" });
  };

  const deleteItem = (id) => {
    fetch(`/api/lists/listItems/${listId}/${id}`);
    setListItems(
      listItems.filter((item) => {
        if (item._id !== id) {
          return item;
        }
      }),
    );
    console.log(id);
  };

  const editItemID = (item) => {
    console.log(item);
    setEditItem(item._id);
    setUpdateItem(item.listItem);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    window.location.href = "/login";
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
        {listName}
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
        <h3>
          <Link href={"/"}>View Lists</Link>
        </h3>
        <Button click={handleLogout}>Log Out</Button>
      </div>
      <AddForm
        submit={handleSubmit}
        mode={"listItem"}
        value={newItem.listItem}
        change={handleChange}
        className={"border-0"}
      />
      <div className="w-full">
        <h2>List Items</h2>
        <div className="m-auto">
          {listItems.map((item) => {
            if (item._id === editItem) {
              return (
                <div
                  key={item._id}
                  className="
                  m-2.5 
                  bg-gray-200
                  "
                >
                  <input type="text" value={item.listItem} />
                  <button onClick={() => editItemID(item)}>Update</button>
                </div>
              );
            }
            return (
              <div
                key={item._id}
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
                <p className="w-80">{item.listItem}</p>
                <Button click={() => editItemID(item)} border>
                  Edit
                </Button>
                <Button
                  click={() => deleteItem(item._id)}
                  className={"bg-red-700 text-white"}
                  border
                >
                  Delete
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </AppContainer>
  );
};

export default ListItems;
