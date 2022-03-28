const jwt = require("jsonwebtoken");
const JWT_SIGN = "VerifiedbyGeeky@ritikranjan";

const fetchuser = (req,res,next) => {

    //GET THE USER fROM jwt TOKEN AND ADD ID TO REQ OBJECT
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error : "{Please Using valid Credentials"})
    }
    try{
        const string = jwt.verify(token,JWT_SIGN);
        req.user = string.user;
        next();
    } catch(error){
        res.status(401).send({error : "{Please Using valid Credentials"})
    }
    
}


module.exports = fetchuser;