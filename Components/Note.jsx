import React, { useState } from "react";
import axios from "axios";

const Note = ({ id, title, content, delFunction, editFunction }) => {
  const handleDelete = (itemId) => {
    delFunction(itemId);
  };

  const handleUpdate = (itemId, t, c) => {
    editFunction(itemId, t, c);
  };

  const [checkbox, setCheckbox] = useState(false);

  const handleCheck = (id) => {
    setCheckbox(!checkbox);

    // let value = checkbox
    axios
      .patch(
        `https://mern-todo-app-backend-iota.vercel.app/put/checkbox/${id}`,
        { value: !checkbox }
      )
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="border-0 p-10 mt-12 w-64 ml-10 rounded-xl shadow-xl">
        <h1 className={`font-bold text-lg ${checkbox ? "line-through" : ""}`}>
          {title}
        </h1>
        <p className={`mt-5 w-auto ${checkbox ? "line-through" : ""}`}>
          {content}
        </p>
        <div className="flex justify-between items-baseline gap-5">
          <input type="checkbox" onClick={() => handleCheck(id)} />
          <button
            onClick={() => handleUpdate(id, title, content)}
            className="font-bold text-yellow-300 p-2 mt-20 rounded-xl border hover:border  hover:text-white hover:bg-yellow-300"
          >
            UPDATE
          </button>
          <button
            onClick={() => handleDelete(id)}
            className="font-bold border text-yellow-300  rounded-xl p-2 mt-20  hover:border  hover:text-white hover:bg-yellow-300"
          >
            DELETE
          </button>
        </div>
      </div>
    </>
  );
};

export default Note;
