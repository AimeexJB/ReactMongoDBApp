// Artist

const mongoose = require('mongoose');

const ArtistSchema = mongoose.Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Artist', ArtistSchema);
