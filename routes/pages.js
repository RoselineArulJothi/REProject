const express = require('express');
const router = express.Router();


const { create, list, read, pageById, remove, update } = require('../controller/pages');

router.post("/page/create", create);
router.get("/pages", list);
router.get("/page/:pageid", read);
router.put("/page/:pageid", update);
router.delete("/page/:pageid", remove);

router.param("pageid", pageById);
module.exports = router;