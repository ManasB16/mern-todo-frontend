import React, { useEffect, useRef, useState } from "react";
import Note from "./Note";
import axios from "axios";

const AddNote = () => {
  const TitleVal = useRef("");
  const NoteVal = useRef("");
  const [notes, setNotes] = useState([]);
  const [toggleSubmit, setToggleAdd] = useState(true);
  const [editingId, setEditingId] = useState(null);
  // console.log(editingId);
  useEffect(() => {
    axios
      .get("https://mern-todo-app-backend-iota.vercel.app/get")
      .then((result) => setNotes(result.data))
      .catch((error) => console.log(error));
  }, [notes]);

  const formSubmit = (e) => {
    e.preventDefault();
    // console.log(TitleVal.current); // this gives the whole input field
    // const id = new Date().getTime().toString();
    const title = TitleVal.current.value;
    const content = NoteVal.current.value;
    // const newContent = {
    //   id,
    //   title,
    //   content,
    // };

    if (title === "") alert("Please enter a title");
    else if (editingId && !toggleSubmit) {
      // console.log(title, content, toggleSubmit);
      // console.log("update");
      axios
        .put(
          `https://mern-todo-app-backend-iota.vercel.app/update/${editingId}`,
          {
            title: title,
            content: content,
          }
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      // setNotes(
      //   notes.map((note) => {
      //     if (note.id == editingId) {
      //       return {
      //         ...note,
      //         title,
      //         content,
      //       };
      //     }
      //     return note;
      //   })
      // );
      setToggleAdd(true);
      setEditingId(null);
      // console.log(editingId);
    } else {
      axios
        .post("https://mern-todo-app-backend-iota.vercel.app/add", {
          title: title,
          content: content,
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      // setNotes((prev) => {
      //   return [...prev, newContent];
      // });
    }
    TitleVal.current.value = "";
    NoteVal.current.value = "";
  };

  const deleteNote = (noteId) => {
    axios
      .delete(`https://mern-todo-app-backend-iota.vercel.app/delete/${noteId}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    // setNotes((prev) => {
    //   return prev.filter((item) => item.id !== noteId);
    // });
  };

  const editNote = (noteId, t, c) => {
    setToggleAdd(false);
    setEditingId(noteId);
    TitleVal.current.value = t;
    NoteVal.current.value = c;
    // console.log(editingId);
  };

  return (
    <>
      <form
        onSubmit={formSubmit}
        className="flex flex-col md:flex-row justify-center gap-7 mt-16 items-end"
      >
        <div className="h-36 flex flex-col w-full lg:w-96 justify-center shadow-lg rounded-xl">
          <input
            type="text"
            placeholder="Title"
            className="h-48 outline-none"
            ref={TitleVal}
          />
          <textarea
            type="text"
            placeholder="Take a Note..."
            className="h-96 outline-none"
            ref={NoteVal}
          />
        </div>

        <button className="font-bold text-yellow-300 h-16 w-full lg:w-24 rounded-xl border hover:border  hover:text-white hover:bg-yellow-300">
          {toggleSubmit ? "ADD" : "UPDATE"}
        </button>
      </form>
      <main className="flex flex-row flex-wrap">
        {notes.legnth === 0 ? (
          <div>
            <h2>No Records</h2>
          </div>
        ) : (
          notes.map((note) => (
            <Note
              key={note._id}
              id={note._id}
              title={note.title}
              content={note.content}
              delFunction={deleteNote}
              editFunction={editNote}
            />
          ))
        )}
      </main>
    </>
  );
};

export default AddNote;
