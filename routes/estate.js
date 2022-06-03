const express = require('express');
const route = express.Router();

const { create, list, read, estateById, remove, update } = require('../controller/estate');

route.post("/estate/create", create);
route.get("/estates", list);
route.get("/estate/:estateid", read);
route.delete("/estate/:estateid", remove);
route.put("/estate/:estateid", update);

route.param("estateid", estateById);
module.exports = route;