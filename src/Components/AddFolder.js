import React, { useState } from "react";
// import useForm from '../Hooks/useForm';

const getUuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    // eslint-disable-next-line
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export default function AddFolder(props) {
  const [name, setName] = useState("");

  const handleSubmit = event => {
    event.preventDefault();

    async function addFolder(newFolder) {
      await fetch(`http://localhost:9090/folders`, {
        method: "POST",
        body: JSON.stringify(newFolder),
        headers: {
          "content-type": "application/json"
        }
      });
      console.log(`sent ${newFolder.name}`);
      props.setStoreChange(storeChange => storeChange + 1);
    }

    addFolder({
      name: name,
      id: getUuid()
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Add Folder:</p>
      <input name="name" value={name} onChange={e => setName(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}
