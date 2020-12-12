const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../db/models/User");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("exports.signup -> hashedPassword", hashedPassword);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res) => {
  const payload = {
    id: user.id,
    username: user.username,
    expires: Date.now() + JWT_EXPIRATION_MS, // the token will expire 15 minutes from when it's generated
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.status(201).res.json({ token });
};
