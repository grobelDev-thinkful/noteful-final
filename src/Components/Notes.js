import React from 'react';
import { Link } from 'react-router-dom'
// import dummyStore from '../dummy-store.js';

export default function Notes(props) {

  let mode = props.match.path.split("/")[1];
  let store = props.store;

  if (mode === '') {
    return (
      <>
        {store.notes.map((note, i) =>
          <li key={`${i}-note`}>
            <Link to={`/note/${note.id}`}>
              {note.name} - {store.folders.find(folder => folder.id === note.folderId).name}
            </Link>
          </li>
        )}
      </>
    )
  } else if (mode === 'folder') {

    let folderId = props.match.params.folderId;
    let notes = store.notes.filter(note => note.folderId === folderId);

    return (
      <>
        {notes.map((note, i) =>
          <li key={`${i}-note`}>
            <Link to={`/note/${note.id}`}>
              {note.name} - {store.folders.find(folder => folder.id === note.folderId).name}
            </Link>
          </li>
        )}
      </>
    )
  } else if (mode === 'note') {

    let noteId = props.match.params.noteId;
    let note = store.notes.find(_note => _note.id === noteId);

    return (
      <>
        <li>
          {note.name} - {store.folders.find(folder => folder.id === note.folderId).name}
        </li>
        <span>
          {note.content}
        </span>
      </>
    )
  }
}