const passport = require("passport");
const User = require("../models/user");

module.exports.renderSingUp = (req, res) => {
    res.render("user/singup.ejs");
};

module.exports.singUp = async(req, res) =>{
    try{
        let {username, email, password} = req.body;
    const newUser = new User({ username, email});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) =>{
        if(err) {
            return next(err);
        }
        req.flash("success", "Welcome to Wanderlust");
        res.redirect("/listings");
    });
    } catch (e){
        req.flash("error", e.message);
        res.redirect("/singup");
    }
};

module.exports.renderLogIn = (req, res) => {
    res.render("user/login.ejs");
};

module.exports.logIn = async(req,res) => {
    req.flash("success","Welcome to Wanderlust! You are logged in!! ");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
};

module.exports.logOut = (req, res, next) =>{
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
};