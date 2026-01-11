"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const ListNames = ({ children }) => {
  return (
    <div
      className="
      max-w-140
      mx-auto 
      p-4
      rounded
      bg-gray-400
      shadow-md
      shadow-gray-800
      "
    >
      {children}
    </div>
  );
};

export default ListNames;
