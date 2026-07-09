const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt= require("bcrypt");


async function registerUser(req, res){

    const {userName , email , password , role="user"} =req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
          {userName:userName},
          {email:email},
        ]
    });

    if (isUserAlreadyExists){
        return res.status(400).json({
            message:"user already exists",
        })
     }

     const hash = await bcrypt.hash(password , 10);

     const user = await userModel.create({
        userName:userName,
        email:email,
        password:hash,
        role:role,
     });

     const token = jwt.sign({
        id:user._id,
        role:user.role,
     },process.env.JWT_SECRET);

     res.cookie("token" , token);

     res.status(201).json({
        message:"user is registered",
        user:{
            userName:user.userName,
            email:user.email,
            role:user.role,
        }
     })

}

module.exports = {registerUser};
