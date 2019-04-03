// Songs

const mongoose = require('mongoose');

const SongSchema = mongoose.Schema({
    name: String,
    length: String,
    album_name: String,
    album_cover: String,
    artist_id : { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }
});

module.exports = mongoose.model('Song', SongSchema);
