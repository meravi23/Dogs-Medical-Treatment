const express = require('express');
const app = express();
const port = 5555;

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`Dog Medical Treatment App is running on port: ${port}`);
})

app.get('/dog-list', function (req, res) {
    console.log("receiving get request");
    dog1 = {
        name: "סנופי",
        age: 4,
        num: 2562,
        gender: "זכר",
        loc: "כלבייה",
        status: "טופל",
        descrip: "נמצא נטוש בירכא"
    };
    dog2 = {
        name: "לאקי",
        age: 1,
        num: 2575,
        gender: "נקבה",
        loc: "אומנה",
        status: "פתוח",
        descrip: "אושפזה עקב קדחת קרציות"
    }

    let dogList = [dog1, dog2];
    res.json(dogList);
});