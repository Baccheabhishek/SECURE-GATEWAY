const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt= require("bcrypt");

// User Registration
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

// User Login
async function userLogin(req ,res){
    const {userName , email ,password } = req.body;

    const user =await userModel.findOne({
        $or :[
            {useName:userName},
            {email:email},
        ]
    })

    if( !user){
        return res.status(401).json({
            message:"User Have To Register First"
        })
    }

    const isPasswordValid =await bcrypt.compare(password , user.password);

    const token = jwt.sign({
        id : user._id,
        role : user.role,
    },process.env.JWT_SECRET);


    const cookie = ("token" ,token);
    
     return res.status(401).json({
        message:"User Is Logged In",
        user:{
           userName:user.UserName,
           email:user.email,
           role:user.role,
        }
    })

}

// user Log Out
function userLogOut( req ,res){
res.clearCookie("token")
return res.status(200).json({
    message:"User Log Out Successful"
})
}

// To Log User

function me(req ,res){
    console.log(req.user)
    return res.status(401).json({
        message:"user fetched successfully",
        user:req.user,
    })
    
}
module.exports = {registerUser ,userLogin ,userLogOut ,me};
