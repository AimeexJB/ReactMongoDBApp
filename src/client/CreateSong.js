import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CreateSong extends Component {
    constructor(props) {
        super(props);
        // store form fields in state
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
        axios.get('/api/artists')
            .then(response => {
                this.setState({ artists: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChange(event) {
    // one of the input boxes changed, update the state to match
    // note: name of the input boxes must match the property names in state
        const name = event.target.name;
        const value = event.target.value;

        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        // send a POST request to the server
        // the request includes the state, which is the info. for the new user to be created
        axios.post('/api/songs', this.state)
            .then(response => {
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
    // note: name of the inputs must match the property names in state
        return (
            <div className="uk-container">
                <form onSubmit={this.handleSubmit} className="uk-form-horizontal uk-margin-large">
                    <h2>Add New Song</h2>

                    <div className="uk-margin">
                        <label className="uk-form-label" htmlFor="form-horizontal-text">Name</label>
                        <div className="uk-form-controls">
                            <input className="uk-input uk-form-width-large" id="form-horizontal-text" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="uk-margin">
                        <label className="uk-form-label" htmlFor="form-horizontal-text">Length</label>
                        <div className="uk-form-controls">
                            <input className="uk-input uk-form-width-large" id="form-horizontal-text" type="text" name="length" value={this.state.length} onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="uk-margin">
                        <label className="uk-form-label" htmlFor="form-horizontal-text">Album Name</label>
                        <div className="uk-form-controls">
                            <input className="uk-input uk-form-width-large" id="form-horizontal-text" type="text" name="album_name" value={this.state.album_name} onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="uk-margin">
                        <label className="uk-form-label" htmlFor="form-horizontal-text">Album Cover</label>
                        <div className="uk-form-controls">
                            <input className="uk-input uk-form-width-large" id="form-horizontal-text" type="text" name="album_cover" value={this.state.album_cover} onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="uk-margin">
                        <label className="uk-form-label" htmlFor="form-horizontal-select">Artists</label>
                        <div className="uk-form-controls">
                            <select className="uk-select uk-form-width-large" id="form-horizontal-select"
                                onChange={(e) => this.setState({artist_id: e.target.value, validationError: e.target.value === '' ? 'You must select an Artist' : ''})}>
                                <option disabled selected option="true"> Select an Artist </option>
                                {this.state.artists.map((a) => <option key={a._id} value={a._id}> {a.name} </option>)}
                            </select>
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

export default CreateSong;
