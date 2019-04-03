// Artist

import React from 'react';
import { Link } from 'react-router-dom';

class Artist extends React.Component {
    render() {
        return (

            <div>
                <div className="uk-card uk-card-default  uk-card-hover">
                    <div className="uk-card-media-top uk-grid-match">
                        <img src={this.props.photo} />
                    </div>
                    <div className="uk-card-body">
                        <h3 className="uk-card-title">{this.props.name}</h3>

                        <Link to={`/song/${this.props.id}`}>
                            <button className="uk-button uk-button-default" type="button">
                                        View Songs
                            </button>
                        </Link>
                        
                    </div>
                </div>

            </div>

        );
    }
}

export default Artist;
