const express = require("express");
let router = express.Router();
const userCtrl = require("../controllers/user.controller");
const authCtrl = require("../controllers/auth.controller");

router
    .route("/users")
    .get(userCtrl.getUsers);

router
    .route("/user/:userId")
    .get(userCtrl.getOneUser);

router
    .route("/user/register")
    .post(authCtrl.registration);

router
    .route("/user/login")
    .post(authCtrl.login);

module.exports = router;