const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type: String
    },
    content:{
        type: String,
        required: true        
    },
    tags:{
        type: String,
        default: "General"
    },
    date:{
        type: String,
        default: Date.now
    },

});

const Notes = mongoose.model('notes',NotesSchema);
module.exports = Notes;