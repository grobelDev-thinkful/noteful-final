import React, { useState, useEffect } from "react";

const getUuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    // eslint-disable-next-line
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export default function AddNote(props) {
  const [name, setName] = useState("");
  const [select, setSelect] = useState("NoName");
  const [content, setContent] = useState("");

  let folders = props.store.folders;

  useEffect(() => {
    // Default Selection
    if (select === "NoName") {
      setSelect(() =>
        props.store.folders[0] === undefined
          ? "NoName"
          : props.store.folders[0].name
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const handleSubmit = event => {
    event.preventDefault();

    async function addNote(newNote) {
      await fetch(`http://localhost:9090/notes`, {
        method: "POST",
        body: JSON.stringify(newNote),
        headers: {
          "content-type": "application/json"
        }
      });
      console.log(`sent ${newNote.name}`);
      props.setStoreChange(storeChange => storeChange + 1);
    }

    let timeModified = new Date().toJSON();

    let newNote = {
      id: getUuid(),
      name: name,
      modified: timeModified,
      folderId: folders.find(folder => folder.name === select).id,
      content: content
    };

    addNote(newNote);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Add Note:</p>
      <span>name: </span>
      <input value={name} onChange={e => setName(e.target.value)}></input>
      <br></br>
      <span>folder: </span>
      <select onChange={e => setSelect(e.target.value)}>
        {folders.map((folder, i) => (
          <option key={`${i}-selectOption`} value={folder.name}>
            {folder.name}
          </option>
        ))}
      </select>
      <br></br>
      <span>content: </span>
      <input value={content} onChange={e => setContent(e.target.value)}></input>
      <button type="submit">Submit</button>
    </form>
  );
}
