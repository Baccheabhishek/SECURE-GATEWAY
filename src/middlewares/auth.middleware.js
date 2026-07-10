const jwt = require ("jsonwebtoken");

function authAdmin(req ,res ,next){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    try{
        const decoded = jwt.verify(token ,process.env.JWT_SECRET)
        if ( decoded.role !== admin){
            return res.status(401).json({
                message:"Unauthorized"
            })

           }
           req.user =decoded;
           next();
    }
    catch(error){
        return res.status(401).json({
            message:"unauthorized"
        })


    }

}


function authUser(req ,res ,next){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Unauthorized 1"
        })
    }

try{
   const decoded = jwt.verify(token , process.env.JWT_SECRET);

   if ( decoded.role !== "user"){
    return res.status(401).json({
        message:"Unauthorized 2"
    })
   }

   req.user = decoded;
   next();
}
catch(error){
    console.log(error);
    
    return res.status(401).json({
        message:"Unauthorized 3"
    })

}

}


module.exports = {authAdmin, authUser}