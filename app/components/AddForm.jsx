"use client";
import Button from "./Button";
import { useFormStatus } from "react-dom";

const AddForm = ({ mode, submit, value, change }) => {
  const { pending } = useFormStatus();

  return (
    <>
      <form
        // onSubmit={submit}
        action={submit}
        className="
        mb-5 
        p-2.5 
        bg-blue-500"
      >
        <label htmlFor={mode}>List Name </label>
        <input
          type="text"
          name={mode}
          id={mode}
          // value={value}
          // onChange={change}
          className="mx-2 bg-white"
        />
        <Button className="bg-gray-200" border>
          {pending
            ? "Adding..."
            : `Add ${mode === "listName" ? "List" : "Item"}`}
        </Button>
      </form>
    </>
  );
};

export default AddForm;
