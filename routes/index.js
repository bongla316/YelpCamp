// Express.js Router config
var express = require("express");
var router  = express.Router();
var passport = require("passport");

var User = require("../models/user");

// =============================================================================
// HOMEPAGE ROUTE
// =============================================================================

router.get('/', function (req, res) {
   res.render("landing");
});

// =============================================================================
// AUTHENTICATION ROUTES
// =============================================================================

// Show register form
router.get("/register", function (req, res) {
   res.render("register");
});

// Handle sign up logic
router.post("/register", function (req, res) {
   var newUser = new User({
      username: req.body.username
   });
   User.register(newUser, req.body.password, function (err, user) {
      if (err) {
         console.log(err);
         return res.render("register");
      }

      passport.authenticate("local")(req, res, function () {
         res.redirect("/campgrounds");
      });
   });
});

// Login form
router.get("/login", function (req, res) {
   res.render("login");
});

// Login logic
router.post("/login", passport.authenticate("local", {
   successRedirect: "/campgrounds",
   failureRedirect: "/login"
}), function (req, res) {
   
});

// Logout route
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/campgrounds");
});

// Middleware for logout route
function isLoggedIn(req, res, next){
   if(req.isAuthenticated()){
      return next();
   }
   return res.redirect("/login");
}

module.exports = router;