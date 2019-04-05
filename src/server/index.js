const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const Artist = require('./models/Artist');
const Song = require('./models/Song');

const server = express();
const dbname = 'ReactCA2';

// serve files from the dist directory
server.use(express.static('dist'));

// const mongo_uri = process.env.MONGODB_URL || `mongodb://localhost:27017/${dbname}`;
const mongo_uri = 'mongodb+srv://aimeeredmond:Barbie123@reactca2-kifoa.mongodb.net/ReactCA2?retryWrites=true';

let db;

mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
    if (err) {
        throw err;
    } else {
        console.log(`Successfully connected to ${mongo_uri}`);
    }
});

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());


server.get('/api/artists', (req, res) => {
    Artist.find({}, (err, result) => {
        if (err) throw err;

        res.send(result);
    });
});

server.get('/api/songs', (req, res) => {
    Song.find({}, (err, result) => {
        if (err) throw err;

        res.send(result);
    });
});

server.get('/api/artists/:id', (req, res) => {
    Artist.findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
        if (err) throw err;

        res.send(result);
    });
});

server.get('/api/songs/:id', (req, res) => {
    Song.findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
        if (err) throw err;

        res.send(result);
    });
});

server.get('/api/artists/:id/songs', (req, res) => {
    Artist.findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
        if (err) throw err;

        Song.find({artist_id: result._id}, (err, songs) => {
            if (err) throw err;

            res.send(songs);
        });
    });
});

// Create
server.post('/api/songs', (req, res) => {
    const song = new Song(req.body);
    song.save((err, result) => {
        if (err) throw err;

        console.log('created in database');
        res.redirect('/');
    });
});

// Delete
server.delete('/api/songs', (req, res) => {
    Song.deleteOne( {_id: new ObjectID(req.body.id) }, err => {
        if (err) return res.send(err);

        console.log('deleted from database');
        return res.send({ success: true });
    });
});

// Update Song
server.put('/api/songs', (req, res) => {
    const id  = req.body._id;
    delete req.body._id;
    Song.updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
        if (err) throw err;

        console.log('updated in database');
        return res.send({ success: true });
    });
});

// Find song by an artist
Song.findOne('name').
    populate('artist').
    exec(function(err, story) {
        if (err) return handleError(err);
        console.log('The author is %s', song.artist.name);
    // prints "The author is Ian Fleming"
    });




server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
