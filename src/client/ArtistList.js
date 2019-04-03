// Artits List

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Artist from './Artist';
import axios from 'axios';
import './app.css';

class ArtistList extends Component {
    constructor(props) {
        super(props);

        this.state = { artists: [] };
    }

    componentDidMount() {
        axios.get('/api/artists')
            .then(response => {
                this.setState({ artists: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        const artistsList = this.state.artists.map(u => (
            <Artist
                key={u._id}
                id={u._id}
                name={u.name}
                description={u.description}
                photo={u.photo}
            />
        ));

        return (
            <div className="uk-container">

                <h1>All Artists</h1>

                <Link to={'/playlist'}>
                    <button type="button" className="uk-button uk-button-default uk-margin">
                                View My Playlist
                    </button>
                </Link>

                <div className="uk-child-width-1-3@s uk-margin-large-bottom" uk-grid="true">
                    {artistsList}
                </div>
            </div>
        );
    }
}

export default ArtistList;
