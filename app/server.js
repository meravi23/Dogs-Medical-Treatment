const express = require('express');
const app = express();
const port = 5555;

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`Dog Medical Treatment App is running on port: ${port}`);    
})

  