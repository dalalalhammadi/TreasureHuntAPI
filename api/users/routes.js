const express = require("express");
const router = express.Router();
const { signup } = require("../users/controllers");
const passport = require("passport");
const { signin } = require("../users/controllers");

router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
