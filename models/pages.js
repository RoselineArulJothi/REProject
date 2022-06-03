const mongoose = require('mongoose');

const pageschema = new mongoose.Schema({

    pageno: {
        type: Number,
        required: true,
        unique: true,
    },
    pagename: {
        type: String,
        required: true,
        unique: true,
    },
    estatename: {
        type: String,
        required:true,
    }    
},
{ timestamps: true }
);

module.exports = new mongoose.model("pages", pageschema);