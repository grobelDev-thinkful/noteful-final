import React from "react";
import { Link } from "react-router-dom";
// import dummyStore from '../dummy-store.js';
import AddFolder from "./AddFolder";

export default function Sidebar(props) {
  let mode = props.match.path.split("/")[1];
  let store = props.store;

  let folderId = props.match.params.folderId;
  if (mode !== "note") {
    return (
      <React.Fragment>
        {store.folders.map((folder, i) => (
          <li key={`${i}-folder`}>
            <Link to={`/folder/${folder.id}`}>
              {folderId === folder.id ? "->" : ""} folder {folder.name}
            </Link>
          </li>
        ))}
        <AddFolder setStoreChange={props.setStoreChange}></AddFolder>
      </React.Fragment>
    );
  } else if (mode === "note") {
    let { noteId = "" } = props.match.params;
    let folderId = store.notes.find(note => note.id === noteId).folderId;
    let folder = store.folders.find(folder => folder.id === folderId);
    return (
      <>
        <span>Folder {folder.name}</span>
        <p>
          <Link to="/">Go back</Link>
        </p>
      </>
    );
  }
}
