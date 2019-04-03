// Play List

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './app.css';

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = { songs: [], artists: []};

    }

    componentDidMount() {
        axios.get('/api/songs')
            .then(response => {
                this.setState({ songs: response.data });
            })
            .catch(error => {
                console.log(error);
            });

        axios.get('api/artists')
            .then(response => {
                this.setState({ artists: response.data });

            })
            .catch(error => {
                console.log(error);
            });
    }


    render() {

        const songList = this.state.songs.map((u, index) => (
            <Song
                key={u._id}
                id={u._id}
                name={u.name}
                length={u.length}
                album={u.album_name}
                cover={u.album_cover}
                artist_id={u.artist_id}
                handleDelete={this.handleDelete}
                index={index}
                artists={this.state.artists}
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
                        <img src="https://media2.giphy.com/media/IFdcAnNXLG8Zq/giphy.gif?cid=790b76115ca39a3a6d4f7776592bbd1a" />
                    </div>
                    <div className="uk-width-2-3 uk-text-left">
                        <h2>My Playlist</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate augue. Donec convallis felis ut mi ornare aliquam. Curabitur leo felis, volutpat eget mi at, congue rutrum arcu. Vestibulum ullamcorper mi a massa faucibus, id sollicitudin risus tempor. Ut iaculis arcu dictum condimentum scelerisque. Nunc volutpat luctus diam, accumsan luctus ante tempor quis. Morbi vulputate mauris ut libero feugiat, in pharetra purus posuere. Proin sed arcu sed erat gravida ornare porta ut nunc.</p>
                    </div>
                </div>

                <hr className="uk-divider-icon" />

                {songList.length ?
                    <div>
                        <div>
                            <table className="uk-table uk-table-striped">
                                <thead>
                                    <tr>
                                        <th>Song Name</th>
                                        <th>Artist</th>
                                        <th>Length</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {songList}
                                </tbody>

                            </table>
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


        <tr className="uk-text-left">
            <td >
                {props.index + 1}. {props.name}
            </td>
                Artist Name Here
            <td>
                {props.length}
            </td>
        </tr>




    );
};

export default Playlist;
