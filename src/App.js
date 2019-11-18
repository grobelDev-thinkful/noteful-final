import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
// import dummyStore from './dummy-store.js';
import { Switch, Route, Link } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Notes from './Components/Notes';

// const html = 

function App() {

  const [folders, setFolder] = useState({});
  const [notes, setNotes] = useState({});

  const [store, setStore] = useState({ folders: [], notes: [] });

  useEffect(() => {
    async function fetchData() {

      // Start API Calls Asynchronously
      const folderFetch = fetch(`http://localhost:9090/folders/`);
      const notesFetch = fetch('http://localhost:9090/notes/')

      // Get Results
      const folderResult = await folderFetch;
      const notesResult = await notesFetch;

      // Convert to json
      const folders = await folderResult.json();
      const notes = await notesResult.json();

      // Save to Store
      setStore(store => ({ ...store, folders }));
      setStore(store => ({ ...store, notes }));
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <Switch>
        {['/', '/folder/:folderId', '/note/:noteId'].map(path =>
          <Route
            key={path}
            exact path={path}
            render={routeProps =>
              <>
                <Header><Link to="/">Noteful</Link></Header>
                <Container>
                  <SidebarContainer>
                    <Sidebar
                      store={store}
                      {...routeProps}
                    />
                  </SidebarContainer>
                  <NotesContainer>
                    <Notes
                      store={store}
                      {...routeProps}
                    />
                  </NotesContainer>
                </Container>
              </>
            } />
        )}
        <Route path="/" render={() => <div>404</div>}></Route>
      </Switch>
    </div>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  padding: 5px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;

  font-size: 2em;
  padding: 5px;
  background-color: #eff0f1;
`;

const SidebarContainer = styled.div`
  flex-direction: column;
  // width: 2000px;
  flex-grow: 1;
  `

const NotesContainer = styled.div`
  flex-direction: column;
  flex-grow: 4;
`;