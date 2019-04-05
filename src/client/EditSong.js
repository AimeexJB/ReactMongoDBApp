import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class EditSong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            length: '',
            album_name: '',
            album_cover: '',
            artist_id: '',
            artists: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // Getting the data from the database and populating the fields with it
        axios.get('/api/songs/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    _id: response.data._id,
                    name: response.data.name,
                    length: response.data.length,
                    album_name: response.data.album_name,
                    album_cover: response.data.album_cover,
                    artist_id: response.data.artist_id
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChange(event) {
        // updating the state to match the input boxes
        const name = event.target.name;
        const value = event.target.value;

        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.put('/api/songs', this.state)
            .then(res => this.props.history.push('/'))
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="uk-container">

                <form onSubmit={this.handleSubmit} className="uk-form-horizontal uk-margin-large">
                    <h2>Edit Song</h2>

                    <div className="uk-margin">
                        <label className="uk-form-label" for="form-horizontal-text">Name</label>
                        <div className="uk-form-controls">
                            <input className="uk-input uk-form-width-large" id="form-horizontal-text" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="uk-margin">
                        <label className="uk-form-label" for="form-horizontal-text">Length</label>
                        <div className="uk-form-controls">
                            <input className="uk-input uk-form-width-large" id="form-horizontal-text" type="text" name="length" value={this.state.length} onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="uk-margin">
                        <label className="uk-form-label" for="form-horizontal-text">Album Name</label>
                        <div className="uk-form-controls">
                            <input className="uk-input uk-form-width-large" id="form-horizontal-text" type="text" name="album_name" value={this.state.album_name} onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="uk-margin">
                        <label className="uk-form-label" for="form-horizontal-text">Album Cover</label>
                        <div className="uk-form-controls">
                            <input className="uk-input uk-form-width-large" id="form-horizontal-text" type="text" name="album_cover" value={this.state.album_cover} onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="uk-margin">
                        <label className="uk-form-label" for="form-horizontal-select">Artists</label>
                        <div className="uk-form-controls">
                            <input className="uk-input uk-form-width-large" id="form-horizontal-text" type="text" name="artist_id" value={this.state.artist_id} onChange={this.handleChange} />
                        </div>
                    </div>

                    <Link to={'/'}>
                        <button className="uk-button uk-button-default uk-margin-right" type="button">
                                Home
                        </button>
                    </Link>


                    <button className="uk-button uk-button-primary uk-margin-right" type="submit" value="Submit" >
                        Submit
                    </button>


                </form>
            </div>
        );
    }
}

export default EditSong;
