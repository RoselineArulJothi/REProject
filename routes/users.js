const express = require("express");
const router = express.Router();


const {
    create,
    userById,
    read,
    update,
    list,
    remove,
    //deleteuser,
    //findUserForEdit,
    //userread,
    //userupdate,
} = require("../controller/users");

router.get("/users", list);
router.post("/user/create",  create);
router.get("/user/:userId", read);
router.delete("/user/:userId", remove);
//router.get("/user/:edituserId", userread);
router.put("/user/:userId",  update);
//router.put("/user/:edituserId", userupdate);
//router.delete("/user/:edituserId", deleteuser);

router.param("userId", userById);
//router.param("edituserId", findUserForEdit);

module.exports = router;
