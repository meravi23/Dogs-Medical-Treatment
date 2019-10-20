const express = require('express');
const app = express();

app.use(express.static(__dirname + '/app')); 
 
app.listen(8000);
console.log("server running on port 8000");
