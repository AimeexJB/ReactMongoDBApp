// Songs List

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './app.css';

class SongList extends Component {
    constructor(props) {
        super(props);
        this.state = { songs: [], artist: [] };

        this.handleDelete = this.handleDelete.bind(this);
        this.updateSongs = this.updateSongs.bind(this);
    }

    componentDidMount() {
        // getting the artist data from the server
        this.updateSongs();

        axios.get(`api/artists/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ artist: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }


    updateSongs() {
    // making a request to the server for the artists data and then storing it in state
        axios.get(`api/artists/${this.props.match.params.id}/songs`)
            .then(response => {
                this.setState({ songs: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleDelete(songId) {
        // making a delete request to the server to remove a song with a particular id
        axios
            .delete('api/songs', {
                data: {
                    id: songId
                }
            })
            .then(response => {
                // if it was successful then it will re-get the new list of songs
                this.updateSongs();
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        const songList = this.state.songs.map(u => (
            <Song
                key={u._id}
                id={u._id}
                name={u.name}
                length={u.length}
                album={u.album_name}
                cover={u.album_cover}
                handleDelete={this.handleDelete}
            />
        ));

        return (
            <div className="uk-container">
                <h1>All Songs</h1>

                <Link to={'/'}>
                    <button type="button" className="uk-button uk-button-default uk-margin-right">
                            Home
                    </button>
                </Link>

                <Link to={'/create-song'}>
                    <button type="button" className="uk-button uk-button-primary uk-margin-right">
                            Create Song
                    </button>
                    <br />
                </Link>

                <br />

                <div uk-grid="true">
                    <div className="uk-width-1-3">
                        <img src={this.state.artist.photo} />
                    </div>
                    <div className="uk-width-2-3 uk-text-left">
                        <h2>{this.state.artist.name}</h2>
                        <p>{this.state.artist.description}</p>
                    </div>
                </div>

                <hr className="uk-divider-icon" />

                {songList.length ?
                    <div>
                        <div>
                            {songList}
                        </div>
                    </div> :

                    <h2>No Songs</h2>
                }
            </div>
        );
    }
}


const Song = (props) => {
    return (
        <div>

            <div className="uk-card uk-card-default uk-card-small uk-grid-collapse uk-child-width-1-5 uk-margin" uk-grid="true">

                <div className="uk-card-media-left uk-cover-container">
                    <img src={props.cover} uk-cover="true" />
                </div>

                <div className="uk-card-body uk-height-match uk-width-expand@m uk-text-left" uk-grid="true">
                    <h2 className="uk-card-title">{props.name}</h2>
                    <p>Length:
                        <br />
                        {props.length}
                    </p>
                    <p>Album:
                        <br />
                        {props.album}
                    </p>
                </div>

                <ul className="uk-card-body uk-iconnav uk-iconnav-vertical uk-list-large uk-text-right">
                    <li><Link to={`/edit-song/${props.id}`} uk-icon="icon: file-edit"></Link></li>
                    <li><a href="#" onClick={() => {props.handleDelete(props.id);}} uk-icon="icon: trash"></a></li>
                </ul>

            </div>
        </div>

    );
};

export default SongList;
