const express = require('express');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const db = mongojs('doglist', ['dogs']);
const mongodb = require('mongodb');
const fs = require('fs').promises;
const fetch = require('node-fetch');
const app = express();
const port = 5555;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Dog Medical Treatment App is running on port: ${port}`);
})


const initialDogList = [{
        name: "סנופי",
        age: 4,
        num: 2562,
        gender: "זכר",
        breed: "מעורב",
        loc: "כלבייה",
        status: "טופל",
        descrip: "נמצא נטוש בירכא"
    },
    {
        name: "לאקי",
        age: 1,
        num: 2575,
        gender: "נקבה",
        breed: "קוקר ספנייל",
        loc: "אומנה",
        status: "פתוח",
        descrip: "אושפזה עקב קדחת קרציות"
    }
];

