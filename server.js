const express = require("express");
const app = express();
const routes = require('./routes/sch');
//import mongoose
const mongoose = require('mongoose');


require('dotenv').config();
app.use(express.json()); // parses incoming requests with JSON payloads

app.use('/', routes); //to use the routes
app.use('/uploads', express.static('./uploads'));

//establish connection to database
mongoose.connect(
    'mongodb://localhost:27017/gov_db',
    { useUnifiedTopology: true},
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);


const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on port ' + listener.address().port)
})
