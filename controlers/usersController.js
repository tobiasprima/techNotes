const User = require("../models/User");
const Notes = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

//@desc Get all users
//@route GET /users
//@access private
const getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find().select('-password').lean();
    if(!users?.length){
        res.status(400).json({message: 'No users found.'});
    }
    res.json(users);
});

//@desc Create New User
//@route POST /users
//@access private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles} = req.body;

    //Confirm Data
    if (!username || !password){
        return res.status(400).json({message: "All fields are required."});
    }


    //Check for duplicates
    const duplicate = await User.findOne({username}).collation({locale: 'en', strength: 2}).lean().exec();

    if (duplicate){
        return res.status(409).json({message: 'Duplicate username'});
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const userObject = (!Array.isArray(roles) || !roles.length) 
        ? { username, "password": hashedPassword}
        : { username, "password": hashedPassword, roles }

    //Create and Store new user
    const user = await User.create(userObject);

    if(user){
        res.status(201).json({message: `New User ${username} created.`});
    } else {
        res.status(404).json({message: 'Invalid user data received.'});
    }
});

//@desc Update User
//@route PATCH /users
//@access private
const updateUser = asyncHandler(async (req, res, next) => {
    const { id, username, roles, active, password } = req.body;

    //Confirm Data
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean'){
        return res.status(404).json({message: 'All fields are required.'});
    }

    const user = await User.findById(id).exec();

    if(!user){
        return res.status(404).json({message: 'User not found'});
    }

    //Check for Duplicate
    const duplicate = await User.findOne({username}).collation({locale: 'en', strength: 2}).lean().exec();
    //Allow updates to the original user
    if(duplicate && duplicate?.id.toString() !== id){
        return res.status(409).json({message: 'Duplicate username'});
    }

    user.username = username;
    user.roles = roles;
    user.active = active;

    if(password){
        //Hash password
        user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.save();

    res.json({message: `${updatedUser.username} updated.`})
});

//@desc Delete User
//@route DELETE /users
//@access private
const deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.body;

    if(!id){
        return res.status(400).json({message: 'User ID required.'});
    }

    const notes = await Notes.findOne({ user: id}).lean().exec();

    if (notes?.length){
        return res.status(400).json({message: 'User has assigned notes.'});
    }

    const user = await User.findById(id).exec();

    if(!user){
        return res.status(400).json({message: 'User not found.'});
    }

    const result = await user.deleteOne()
    
    const reply = `Username ${result.username} with id ${result._id} deleted.`

    res.json({message: reply});
});

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}