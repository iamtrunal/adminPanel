const router = require('express').Router();
const {verify} = require("../middlewar/auth.middelwar")

const {
    login,
    logout
} = require("../controller/auth.controller");

router.post("/login", login);
router.get("/logout", verify,logout);

module.exports = router;