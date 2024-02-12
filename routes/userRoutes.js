const express = require("express");
const router = express.Router();
const path = require("path");
const userController = require("../controlers/usersController");

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router;