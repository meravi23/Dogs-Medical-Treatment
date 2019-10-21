const express = require('express');
const app = express();
const port = 5555;

app.use(express.static('public'));
// app.use(express.static(''));

app.get('/', function (req, res) {
    res.send('hello world')
  });
  

app.listen(port, () => {
    console.log(`Dog Medical Treatment App is running on port:  ${port}`);    
})

