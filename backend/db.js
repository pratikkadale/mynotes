const mongoose = require('mongoose');

const mongoURI="mongodb://0.0.0.0:27017/notesapp"

const connectToMongo=()=>{
    mongoose.connect(mongoURI)
    console.log("Connected to Database");
}


module.exports = connectToMongo;