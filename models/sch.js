const mongoose = require("mongoose"); //import mongoose

// Sch schema
const SchSchema = new mongoose.Schema({
    name: {type:String, required:true},
    category: {type:String, required:true},
    image: {type:String, required:true},
    link: {type:String, required:true},
    description: {type:String, required:true},
    launchdate: {type:String, required:true},
    enddate: {type:String, required:true}
});

const Sch = mongoose.model('Sch', SchSchema); //convert to model named Sch.
module.exports = Sch; //export for controller use
