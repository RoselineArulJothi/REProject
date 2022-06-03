const express = require('express');
const router = express.Router();


const { create, list, read, roleById, remove, update } = require('../controller/roles');

router.post("/role/create", create);
router.get("/roles", list);
router.get("/role/:roleid", read);
router.put("/role/:roleid", update);
router.delete("/role/:roleid", remove);


router.param("roleid", roleById)
module.exports = router;