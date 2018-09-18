// =============================================================================
// Requirements
// =============================================================================
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// =============================================================================
// ALL MIDDLEWARES
// =============================================================================
var middlewareObj = {};

// Check if user has authorization to edit or delete campground
middlewareObj.checkCampgroundOwnership = function(req, res, next){
   // Check is someone is logged in first and if true, check if user owns the campground
   if(req.isAuthenticated()){
      Campground.findById(req.params.id, function(err, foundCampground){
         if(err || !foundCampground){
            req.flash("error", "Campground not found");
            res.redirect("back");
         } else {
            if (foundCampground.author.id.equals(req.user._id)) {
               next();
            } else {
               req.flash("error", "You don't have permission to do that");
               res.redirect("back");
            }
         }
      });

   } else {
      req.flash("error", "You need to be logged in to do that");
      res.redirect("back");
   }
}

// Check if user has authorization to edit and delete comment
middlewareObj.checkCommentOwnership = function(req, res, next){
   // Check if user logged in first
   if(req.isAuthenticated()){
      Comment.findById(req.params.comment_id, function(err, foundComment){
         if(err || !foundComment){
            req.flash("error", "Comment not found");
            res.redirect("back");
         } else {
            if(foundComment.author.id.equals(req.user._id)){
               next();
            } else {
               req.flash("error", "You don't have permission to do that");
               res.redirect("back");
            }
         }
      });
   } else {
      req.flash("error", "You need to be logged in to do that");
      res.redirect("back");
   }
}

// Check if user is logged in before being able to post a comment
middlewareObj.isLoggedIn = function(req, res, next){
   if(req.isAuthenticated()){
      return next();
   }
   // Update flash to access on the next request
   req.flash("error", "You must be logged in to do that!");
   return res.redirect("/login");
}

module.exports = middlewareObj