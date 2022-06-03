const mongoose = require('mongoose');

/*const addressschema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    country: String,
    zipcode: String
});

module.exports = mongoose.model("Address", addressschema);*/

const estateschema = new mongoose.Schema({
    estateid: {
        type: Number,
        required: true,
    },
    estatename: {
        type: String,
        required: true,
        maxlength: 100
    },
    estatetype: {
        type: String,
        default: "Residential",
        enum: ["Residential", "Commercial", "Warehouse"]
    },
    estateaddress: {
        type:Object,
        properties:{
            street: String,
            city: String,
            state: String,
            country: String,
            zipcode: String           
        }
    },
    contactphoneno: {
        type: String,
        required: true,
        maxlength: 15
    },
    emailid: {
        type: String,
        required: true
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("Estate", estateschema);