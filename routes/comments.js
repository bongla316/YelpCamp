// Express.js Router config
var express = require("express");
var router  = express.Router({mergeParams: true});

var Campground = require("../models/campground");
var Comment = require("../models/comment");

// =============================================================================
// COMMENT ROUTES
// =============================================================================

// New comment route
router.get("/new", isLoggedIn, function (req, res) {
   // Find campground by id
   Campground.findById(req.params.id, function (err, campground) {
      if (err) {
         console.log(err);
      } else {
         res.render("comments/new", {
            campground: campground
         });
      }
   });
});

// Save comment route
router.post("/", isLoggedIn, function (req, res) {
   // Lookup campground using id
   Campground.findById(req.params.id, function (err, campground) {
      if (err) {
         console.log(err);
         res.redirect("/campground");
      } else {
         // Create new comment
         Comment.create(req.body.comment, function (err, comment) {
            if (err) {
               console.log(err);
            } else {
               // Add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               // Save comment
               comment.save();
               console.log("Comment: " + comment.author);
               // Connect new comment to campground
               campground.comments.push(comment);
               campground.save();
               console.log("Campground: " + campground.comments);
               // Redirect campground to show page b
               res.redirect(`/campgrounds/${campground._id}`);
            }
         });
      }
   });

});

// Middleware for logout route
function isLoggedIn(req, res, next){
   if(req.isAuthenticated()){
      return next();
   }
   return res.redirect("/login");
}

module.exports = router;