import React from "react";
import { Link } from "react-router-dom";
import AddNote from "./AddNote";
// import dummyStore from '../dummy-store.js';

export default function Notes(props) {
  let mode = props.match.path.split("/")[1];
  let store = props.store;
  let folderId = props.match.params.folderId;

  let notesCopy = [...store.notes];

  let notes = !mode
    ? notesCopy
    : notesCopy.filter(note => note.folderId === folderId);

  if (mode !== "note") {
    return (
      <>
        {notes.map((note, i) => (
          <li key={`${i}-note`}>
            <Link to={`/note/${note.id}`}>
              {note.name} -{" "}
              {store.folders.find(folder => folder.id === note.folderId).name}
            </Link>
            <button onClick={() => props.deleteNote(note)}>delete note</button>
          </li>
        ))}
        <AddNote store={store} setStoreChange={props.setStoreChange}></AddNote>
      </>
    );
  } else if (mode === "note") {
    let noteId = props.match.params.noteId;
    let note = store.notes.find(_note => _note.id === noteId);

    return (
      <>
        <li>
          {note.name} -{" "}
          {store.folders.find(folder => folder.id === note.folderId).name}
        </li>
        <span>{note.content}</span>
      </>
    );
  }
}
