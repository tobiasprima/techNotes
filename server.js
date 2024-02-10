const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;

app.listen(PORT, function(){
    console.log(`Server is listening on port ${PORT}`)
})