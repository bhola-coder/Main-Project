const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {savaRedirectUrl} = require("../middleware.js");
//? Controllers are here
const { singUp, logIn, logOut, renderSingUp, renderLogIn } = require("../controllers/users.js");


router.route("/singup")
   .get( renderSingUp)
   .post( wrapAsync( singUp ));


router.route("/login")
   .get( renderLogIn)
   .post( savaRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true,}), logIn);

router.get("/logout", logOut);

module.exports = router;