const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const keysecret = process.env.KEY

const authenticate = async(req,res,next)=>{
    try {
        const token = req.cookies.amazonWeb;
        
        const verifyToken = jwt.verify(token,keysecret);
     
        const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token});
       

        if(!rootUser){ return res.status(401).send("Unauthorized:No token provided") };

        req.token = token; 
        req.rootUser = rootUser;   
        req.userID = rootUser._id;   
    
        next();  


    } catch (error) {
        console.log(error);
        return res.status(401).send("Unauthorized:No token provided");
    }
};

module.exports = authenticate;