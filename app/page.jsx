"use client";
import { useState, useEffect, useEffectEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "./components/Button";
import AddForm from "./components/AddForm";
import AppContainer from "./components/AppContainer";

const Home = () => {
  const [listNames, setListNames] = useState([]);
  const [newList, setNewList] = useState({ listName: "" });
  const [edit, setEdit] = useState("");
  const [update, setUpdate] = useState("");
  const [userName, setUserName] = useState("");

  const router = useRouter();
  // const fetchItems = async () => {
  //   try {
  //     const res = await fetch("/api/lists/listNames");
  //     const data = await res.json();
  //     console.log(data);
  //     return setListNames(data);
  //   } catch (err) {
  //     console.log(err);
  //     return err;
  //   }
  // };

  // const fetchItems = useEffectEvent(async () => {
  //   try {
  //     const res = await fetch("/api/lists/listNames");
  //     const data = await res.json();
  //     console.log(data);
  //     return setListNames(data);
  //   } catch (err) {
  //     console.log(err);
  //     return err;
  //   }
  // });

  const fetchItems = () => {
    fetch("/api/lists/listNames")
      .then((res) => {
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);

        setUserName(data.userName);
        setListNames(data.listNames);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // const fetchData = async () => {
    //   await fetchItems();
    // };
    // fetchData();
    fetchItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewList((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/lists/listNames", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newList),
    });

    setNewList({ listName: "" });
    fetchItems();
  };

  const deleteListName = (id) => {
    fetch(`/api/lists/listNames/${id}`);

    setListNames(
      listNames.filter((item) => {
        return item._id !== id;
      })
    );
  };

  const editListName = (item) => {
    setEdit(item._id);
    setUpdate(item.listName);
  };

  const updateListName = (item) => {
    const updateName = {
      _id: item._id,
      listName: update,
    };

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
      })
    );

    setEdit("");
    setUpdate("");
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout");
    // window.location.href = "/login";
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
        Lists
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
      <AddForm
        mode={"listName"}
        submit={handleSubmit}
        value={newList.listName}
        change={handleChange}
      />
      <table className="w-full">
        <thead>
          <tr>
            <th>List Names</th>
          </tr>
        </thead>
        <tbody className="m-auto">
          {listNames.map((listName) => {
            if (listName._id === edit) {
              return (
                <tr
                  key={listName._id}
                  className="
                  m-2.5 
                  bg-gray-200
                  "
                >
                  <td>
                    <input
                      type="text"
                      value={update}
                      onChange={(e) => setUpdate(e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={() => updateListName(listName)}>
                      Update
                    </button>
                  </td>
                </tr>
              );
            } else {
              return (
                <tr
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
                  <td className="w-80">
                    <Link href={`/listItems/${listName._id}`}>
                      {listName.listName}
                    </Link>
                  </td>
                  <td>
                    <Button click={() => editListName(listName)} border>
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      click={() => deleteListName(listName._id)}
                      className={"bg-red-700 text-white"}
                      border
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </AppContainer>
  );
};

export default Home;
