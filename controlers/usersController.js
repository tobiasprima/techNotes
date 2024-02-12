const User = require("../models/Note");
const Notes = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

//@desc Get all users
//@route GET /users
//@access private
const getAllUsers = asyncHandler(async (req, res, next) => {
    
});

//@desc Create New User
//@route POST /users
//@access private
const createNewUser = asyncHandler(async (req, res, next) => {

});

//@desc Update User
//@route PATCH /users
//@access private
const updateUser = asyncHandler(async (req, res, next) => {

});

//@desc Delete User
//@route DELETE /users
//@access private
const deleteUser = asyncHandler(async (req, res, next) => {

});

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}