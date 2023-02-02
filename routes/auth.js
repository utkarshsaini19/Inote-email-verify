const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const Token = require('../models/Token')
const crypto = require('crypto')
const sendEmail = require("../utils/sendEmail")


const JWT_SECRET = process.env.SECRET;


//Route 1 : Create a user using: POST "/api/auth/createuser" , Email authentication
router.post('/createuser', [
  body('email', "Enter a valid email").isEmail(),
  body('name', "Enter name of length > 3").isLength({ min: 3 }),
  body('password', "Enter password of length > 5").isLength({ min: 5 })
]
  , async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    // If there are errors, return Bad request and the errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);

    // User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //   }).then(user => res.json(user))
    //   .catch(err =>{
    //     console.log(err);
    //     res.status(400).json({error : "Please enter a unique value for Email",message:err.message})
    //   });

    // Check whether user with this email exists already
    console.log("Inside /createuser");
    try {


      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({ success,error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Creating a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })

      // Creating a new token
      const token = await new Token({
        userId : user._id,
        token : crypto.randomBytes(32).toString("hex")
      }).save();

      

      const url =`${process.env.CYCLIC_URL}/rusers/${user._id}/rverify/${token.token}`

      console.log("before going in sendEmail.js");
      await sendEmail(user.email,"Verify Email",url)

      return res.status(201).send({message: "An email sent to your email please verify"})


      // const data = {
      //   user: {
      //     id: user._id
      //   }
      // }

      // const authtoken = await jwt.sign(data, JWT_SECRET);
      // //console.log(jwtData);

      // // res.json(user);
      // success=true;
      // res.json({ success,authtoken })


    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error")
    }
  })

// Adding GET router to verify link
router.get("/users/:id/verify/:token", async(req,res)=>{
  try {
    const user = await User.findOne({_id:req.params.id});
    if(!user)
    return res.status(400).send({message:"Invalid Link user id not correct"})

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token
    });
    if(!token)
    return res.status(400).send({message:"Invalid Link token not correct"})

    await User.updateOne({_id:user._id, verified:true});
    await token.remove();

    // const data = {
    //   user: {
    //     id: user._id
    //   }
    // }

    // const authtoken = await jwt.sign(data, JWT_SECRET);
    // //console.log(jwtData);

    // // res.json(user);
    // success=true;
    // res.json({ success,authtoken })

    return res.status(200).json({message:"Email Verified Successfully"})

    
  } catch (error) {
    res.status(500).send({message: error.message})
  }
}) 

//Route 2 : Authenticate a user using: POST "/api/auth/login"

router.post('/login', [
  body('email', "Enter a valid email").isEmail(),
  body('password', "Password Cannot be Blank").exists()
]
  , async (req, res) => {

    let success = false;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ success,error: "Please try to login with correct credentials" });
      }

      if(!user.verified)
      {
        return res.status(400).json({ success,error: "Email not verified" });
      }

      

      const passwordCompare = bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res.status(400).json({ success,error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user._id
        }
      }

      

      const authtoken = await jwt.sign(data, JWT_SECRET);
      success=true;

      res.json({ success,authtoken })


    } catch (error) {

      console.log(error.message);
      res.status(500).send("Internal Server Error")

    }



  })

//Route 3 : Get loggedin user detais using: POST "/api/auth/getuser". Login Required
router.post('/getuser',fetchuser , async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error")
    }
  })

module.exports = router;
