require("dotenv").config();
const userSchema = require("./validation/userScema");
const userRoutes = require("express").Router();
const bcrypt = require("bcryptjs");
const Registration = require("../models/UserEntry");
const jwt = require('jsonwebtoken')
const verifyToken = require('./validation/verifyToken')



userRoutes.post("/", async (req, res) => {
  try {
    // Validate the incoming request body
    const { error } = userSchema(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if email is already registered
    const existingUser = await Registration.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("Email is already registered");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    // Create a new user entry
    const registerUser = new Registration({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      confirmPassword:hash
    });

    // Save the user in the database
    const savedUser = await registerUser.save();

     res.status(201).json({
       message: "User Registered Successfully",
       isAdmin: savedUser.isAdmin,
     });

    
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).send("An error occurred during registration");
  }
});



// login section

userRoutes.post("/login", async (req, res) => {
  try {
    // Find user by email
    const user = await Registration.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email not found");

    // Check if password matches
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send("Invalid password");

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, process.env.SECRET_TOKEN);

    // Send response with token in header and body, ensuring this is the only response
   res.header("auth_token", token).json({
     message: "Login successful",
     isAdmin: user.isAdmin,
     token: token,
   });
  } catch (error) {
    res.status(500).send("An error occurred during login");
  }
});


userRoutes.get("/login",verifyToken, (req, res) => {
  res.send('Token verified and we are at register route section')
});


module.exports = userRoutes;
