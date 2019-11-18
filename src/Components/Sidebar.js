import React from 'react';
import { Link } from 'react-router-dom'
// import dummyStore from '../dummy-store.js';

export default function Sidebar(props) {

  let mode = props.match.path.split("/")[1];
  let store = props.store;

  if (mode === '') {
    return (
      <>
        {store.folders.map((folder, i) =>
          <li key={`${i}-folder`}>
            <Link
              to={`/folder/${folder.id}`}>
              folder {folder.name}
            </Link>
          </li>
        )}
      </>
    )
  } else if (mode === 'folder') {
    let folderId = props.match.params.folderId;
    return (
      <>
        {store.folders.map((folder, i) =>
          folderId === folder.id ?
            (<li key={`${i}-folder`}>
              <Link
                to={`/folder/${folder.id}`}>
                -> folder {folder.name}
              </Link>
            </li>) :
            (<li key={`${i}-folder`}>
              <Link
                to={`/folder/${folder.id}`}>
                folder {folder.name}
              </Link>
            </li>
            )
        )}
      </>
    )
  } else if (mode === 'note') {
    let noteId = props.match.params.noteId;
    let folderId = store.notes.find(note => note.id === noteId).folderId;
    let folder = store.folders.find(folder => folder.id === folderId);
    return (
      <>
        <span>
          Folder {folder.name}
        </span>
        <p><Link to="/">Go back</Link></p>
      </>
    )
  }
}