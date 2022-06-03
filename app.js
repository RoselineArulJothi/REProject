const express = require('express');
require("dotenv").config();
const mongoose = require("mongoose");

const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const roleroute = require('./routes/roles');
const pageroute = require('./routes/pages')
const userroute = require('./routes/users')
const estateroute = require('./routes/estate')


const app = express();

mongoose.connect(process.env.DATABASE, {
    newURLParser: true,
    createIndex: true,
    useUnifiedTopology: true,
}).
    then(() => {
        console.log("DB Connected");
    });

app.get('/', (req, res) => {
    res.send("Hello from node");
});

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/api',roleroute);
app.use('/api',pageroute);
app.use('/api', userroute);
app.use('/api',estateroute);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});