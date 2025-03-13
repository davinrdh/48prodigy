import React from "react";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center ">
      <div className="border-t-4 border-white-500 border-solid rounded-full w-6 h-6 animate-spin"></div>
    </div>
  );
}
