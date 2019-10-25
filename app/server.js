const express = require('express');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const db = mongojs('doglist', ['dogs']); //doglist = db, dogs = collection
// const mongodb = require('mongodb');
// const fs = require('fs').promises;
// const fetch = require('node-fetch');
const app = express();
const port = 5555;

app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Dog Medical Treatment App is running on port: ${port}`);
})

app.get('/dogs', function(req, res) {
    console.log("GET request received");

    // dog1 = {
    //     name: "סנופי",
    //     age: 4,
    //     num: 2562,
    //     gender: "זכר",
    //     loc: "כלבייה",
    //     status: "טופל",
    //     descrip: "נמצא נטוש בירכא"
    // };
    // dog2 = {
    //     name: "לאקי",
    //     age: 1,
    //     num: 2575,
    //     gender: "נקבה",
    //     loc: "אומנה",
    //     status: "פתוח",
    //     descrip: "אושפזה עקב קדחת קרציות"
    // }

    // let dogList = [dog1, dog2];
    // res.json(dogList);

    db.dogs.find(function(err, docs) { // dogs = collection
        console.log(docs);
        res.json(docs);        
    });
});


app.post('/dogs', function(req, res) {
    console.log(req.body);
    db.dogs.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});

app.get('/dogs/:id', function(req, res) {
    let id = req.params.id;
    console.log(id);
    db.dogs.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
        res.json(doc);
    });
});

app.put('/dogs/:id', function(req, res) {
    let id = req.params.id;
    console.log(req.body.name);
    db.dogs.findAndModify({query: {_id: mongojs.ObjectId(id)},
        update: {$set: {name: req.body.name, age: req.body.age,
             num: req.body.num, gender: req.body.gender, loc: req.body.loc,
            status: req.body.status, descrip: req.body.descrip, rabbies: req.body.rabbies,
            distemper1: req.body.distemper1, distemper2: req.body.distemper2, distemper3: req.body.distemper3,
            neuter: req.body.neuter}},
        new: true}, function(err, doc) {
            res.json(doc);
    });
});

app.delete('/dogs/:id', function(req, res) {
    let id = req.params.id;
    console.log(id);
    db.dogs.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc); // sending back to the controller the deleted object
    })
})

