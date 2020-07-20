const router = require("express").Router();
const User = require("../models/User");
const validation = require("../utils/validation");
const bcrypt = require("bcryptjs");
const SALT_FACTOR = 10;
const jwt = require("jsonwebtoken");




router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const { error } = validation(req.body, "register");
  if (error) {
    return res.status(401).send(error.details[0].message);
  }

  const emailExists = await User.findOne({ email: email });

  if (emailExists) {
    return res.status(401).send({
      message: "Email already registered.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, SALT_FACTOR);

  const user = new User({
    email: email,
    name: name,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.status(200).send({
      message: "User is registered!",
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { error } = validation(req.body, "login");
  if (error) {
    return res.status(401).send(error.details[0].message);
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(401).send({
      message: "Invalid Email or password.",
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).send({
      message: "Invalid Email or password. 2",
    });
  } else {
    const token = jwt.sign({_id: user.id,}, process.env.TOKEN_SECRET)
    res.header("auth-token", token).send(token)
    // return res.status(200).send({ message: "Bievenue1" });
  }
});

module.exports = router;
