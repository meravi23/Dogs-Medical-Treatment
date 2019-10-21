const express = require('express');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const db = mongojs('doglist', ['dogs']); //doglist = db, dogs = collection
// const mongodb = require('mongodb');
// const fs = require('fs').promises;
// const fetch = require('node-fetch');
const app = express();
const port = 5555;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Dog Medical Treatment App is running on port: ${port}`);
})

app.get('/doglist', function(req, res) { // doglist = db
    console.log("GET request received");

    db.dogs.find(function(err, docs) { // dogs = collection
        console.log(docs);
        res.json(docs);        
    });
});
