import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import ArtistList from './ArtistList';
import SongList from './SongList';
import CreateSong from './CreateSong';
import EditSong from './EditSong';
import Playlist from './Playlist.js';

// 'main' Component. Sets up the React Router and respective routes
const App = () => {
    return(
        <HashRouter>
            <div>
                <Route exact path="/" component={ArtistList}/>
                <Route path="/playlist" component={Playlist}/>
                <Route path="/song/:id" component={SongList}/>
                <Route path="/create-song" component={CreateSong}/>
                <Route path="/edit-song/:id" component={EditSong}/>
            </div>
        </HashRouter>
    );
};

export default App;
