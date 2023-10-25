const express = require('express')
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'PRATIKji123';


//creating user
router.post('/createuser', [
  body('name').isLength({ min: 3 }),
  body('email', 'Enter valid email-id').isEmail(),
  body('password', 'Enter valid password').isLength({ min: 5 }),
], async (req, res) => {

  let success=false;
  // console.log("REQUEST MADE:-" + req.body);
  // If there are error , Return bad request for errors
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
    success=false;
  }
  //Check if user already exist or not

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exist" })
      success=false;
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    })


    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success=true;
    res.json({ success,authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");


  }

})

//user Login with email and password
router.post('/userlogin', [ body('email').isEmail(),], async (req, res) => {

  let success=false;
  const error = await validationResult(req);
  if (!error.isEmpty) {
    return res.status(400).json({ error: error.array() });
    success = false;
  }

  const { email, password } = req.body;
  try {

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" })
      success = false;
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Invalid Credentials" })
      success = false;
    }


    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success,authtoken })



  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }

})

// Route 3 : get logedin user details using POST "/api/auth/getuser".login required

router.post('/getuser', fetchuser, async (req, res) => {

  try {
    userid = req.user.id;
    const user = await User.findById(userid).select("-password")
    res.send(user)
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }


})

module.exports = router