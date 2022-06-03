const mongoose = require('mongoose');

const roleschema = new mongoose.Schema({

    roleno: {
        type: Number,
        required: true,
        unique: true,
    },
    desig: {
        type: String,
        required: true,
        maxlength: 32,
    },
    
},
{ timestamps: true }
);

module.exports = new mongoose.model("roles", roleschema);