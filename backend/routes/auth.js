const express = require('express')
const Users = require('../models/Users')
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult, check } = require('express-validator');
const jwt = require("jsonwebtoken");
const JWT_SIGN = "VerifiedbyGeeky@ritikranjan";
const fetchuser = require("../middleware/fetchuser")


//Route1 create a user using POST: "/api/auth/createuser" Login is not required here 
router.post('/createuser',[
    body('name',"Enter a valid name").isLength({ min: 3 }),
    body('email',"Enter a valid email").isEmail(),
    body('password',"Password must be atleast 8 charcter").isLength({ min: 8 })
],async (req,res)=>{
    let success = false;
    // If htere are errors , return the bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check whether user with same email exits or not
    try{
    let user = await Users.findOne({name:req.body.name,email:req.body.email});
    if (user){
        success = false;
        return res.status(400).json({success ,error:"Sorry a user with this name and email already exists"})
    }
    let pattern = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );

    if (pattern.test(req.body.password)) {
        
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
    
        // create a new user
        user = await Users.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        
        
        //   .then(user => res.json(user)).catch(err => {console.log(err)
        //     res.json({error :"Please Enter a Unique value ",message: err.message})})
        const data = {
            user:{
                id:user.id
            }
        }
        const authtocken = jwt.sign(data,JWT_SIGN);
        success = true;
        res.json({success , authtocken});
    }else{
        success = false;
        return res.status(400).json({ success , error:"Sorry Password must contains 1 Uppercase,1 Lowercase,1 Number and 1 special character"})
    }

    
    } catch (error){
        console.log(error);
        res.status(500).send("Some error occurred");
    }
});

// Authenticate a user using POST . No login Required
router.post('/login',[
    body('email',"Enter a valid email").isEmail(),
    body('password',"Password must be atleast 8 charcter").isLength({ min: 8 })
],async (req,res)=>{
    let success = false;
    // if there are errors , return bad request and the errors
    const error1 = validationResult(req);
    if(!error1.isEmpty()){
        return res.status(400).json({error : error1.array()});
    }

    const {email,password} = req.body;
    try{
        let user = await Users.findOne({email});
        if(!user){
            success = false
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
           success = false
           return res.status(400).json({ success, error: "Please try to login with correct Password" });
        }

        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SIGN);
        success = true;
        res.json({ success, authtoken })

    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// Route 3 that gives us the user details after logged in
router.post('/getuser', fetchuser ,async (req,res)=>{

try{
    let userId = req.user.id;
    const user = await Users.findById(userId).select("-password");
    res.send(user);
} catch(error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
});

module.exports = router

