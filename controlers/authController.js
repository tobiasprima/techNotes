const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

//@desc Login
//@route POST /auth
//@access public
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password){
        return res.status(400).json({message: 'All field are required.'});
    }

    const foundUser = await User.findOne({username}.exec());

    if(!foundUser || !foundUser.active){
        return res.status(401).json({message: 'Unauthorized.'})
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if(!match) return res.status(401).json({message: 'Unauthorized.'});

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username" : foundUser.username,
                "roles" : foundUser.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10s' }
    )

    const refreshToken = jwt.sign(
        { "username" : foundUser.username},
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d'}
    )
 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server
        secure: true, //https
        sameSite: 'None', //cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry:set to match rt
    })

    res.json({accessToken});
})

//@desc Refresh
//@route GET /auth/refresh
//@access public  because access token has expired
const refresh = asyncHandler(async (req, res) => {

}) 

//@desc Logout
//@route POST /auth/logout
//@access public  clear cookie
const logout = asyncHandler(async ( req, res) => {

})

module.exports = {
    login,
    refresh,
    logout
}