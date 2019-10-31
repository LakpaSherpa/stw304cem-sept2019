const express = require("express");
const mongoose = require("mongoose");
const taskRouter = require('./routes/tasks');
const url = 'mongodb://localhost:27017/demodb';
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then((db) => {
        console.log("Successfully connected to MongodB server");
    }, (err) => console.log(err));


app.use('/task', taskRouter);


app.listen(PORT, () => {
    console.log(`App is running at localhost:${PORT}`);
});