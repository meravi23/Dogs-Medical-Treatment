const express = require('express');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const db = mongojs('doglist', ['dogs']); //doglist = db, dogs = collection
const app = express();
const port = 5555;

app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Dog Medical Treatment App is running on port: ${port}`);
})

app.get('/dogs', function (req, res) {
    console.log("GET request received");

    db.dogs.find(function (err, docs) { // dogs = collection
        //console.log(docs);
        res.json(docs);
    });
});


app.post('/dogs', function (req, res) {
    //console.log(req.body);
    db.dogs.insert(req.body, function (err, doc) {
        res.json(doc);
    });
});

app.get('/dogs/:id', function (req, res) {
    let id = req.params.id;
    console.log(id);
    db.dogs.findOne({
        _id: mongojs.ObjectId(id)
    }, function (err, doc) {
        res.json(doc);
    });
});

app.put('/dogs/:id', function (req, res) {
    let id = req.params.id;
    console.log(req.body.name);
    console.log("mongo id: " + mongojs.ObjectId(id));
    db.dogs.findAndModify({
        query: {
            _id: mongojs.ObjectId(id)
        },
        update: {
            $set: {
                adopter: req.body.adopter,
                age: req.body.age,
                birthday: req.body.birthday,
                breed: req.body.breed,
                chip: req.body.chip,
                comments: req.body.comments,
                descrip: req.body.descrip,
                distemper1: req.body.distemper1,
                distemper2: req.body.distemper2,
                distemper3: req.body.distemper3,
                foster: req.body.foster,
                gender: req.body.gender,
                loc: req.body.loc,
                name: req.body.name,
                neuter: req.body.neuter,
                num: req.body.num,
                rabbies: req.body.rabbies,
                size: req.body.size,
                status: req.body.status
            }
        },
        new: true
    }, function (err, doc) {
        res.json(doc);
    });
});

app.delete('/dogs/:id', function (req, res) {
    let id = req.params.id;
    console.log(id);
    db.dogs.remove({
        _id: mongojs.ObjectId(id)
    }, function (err, doc) {
        res.json(doc); // sending back to the controller the deleted object
    })
});