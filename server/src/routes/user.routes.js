const express = require("express");
const userControllers = require("../controllers/user.controllers");
const router = express.Router();

router.post("/createaccount", userControllers.createUserController);
router.post("/userlogin", userControllers.userLoginController);

module.exports = router;
