// Express.js Router config
var express = require("express");
var router  = express.Router({mergeParams: true});

var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
// =============================================================================
// COMMENT ROUTES
// =============================================================================

// New comment route
router.get("/new", middleware.isLoggedIn, function (req, res) {
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

// Create comment route
router.post("/", middleware.isLoggedIn, function (req, res) {
   // Lookup campground using id
   Campground.findById(req.params.id, function (err, campground) {
      if (err) {
         console.log(err);
         res.redirect("/campground");
      } else {
         // Create new comment
         Comment.create(req.body.comment, function (err, comment) {
            if (err) {
               req.flash("error", "Something went wrong");
               console.log(err);
            } else {
               // Add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               // Save comment
               comment.save();
               // Connect new comment to campground
               campground.comments.push(comment);
               campground.save();
               // Redirect campground to show page b
               req.flash("success", "Successfully added comment");
               res.redirect(`/campgrounds/${campground._id}`);
            }
         });
      }
   });
});

// Edit comment route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Campground.findById(req.params.id, function(err, foundCampground){
      if(err || !foundCampground) {
         req.flash("error", "Campground not found");
         return res.redirect("back");
      }
      Comment.findById(req.params.comment_id, function(err, foundComment){
         res.render("comments/edit", {
            campground_id: req.params.id,
            comment: foundComment
         });
      });   
   });   
});

// Update comment route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
         res.redirect("back");
      } else {
         res.redirect(`/campgrounds/${req.params.id}`);
      }
   });
});

// DELETE ROUTE - Delete a comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
         req.flash("error", err.message);
         res.redirect("back");
      } else {
         req.flash("success", "Comment deleted");
         res.redirect(`/campgrounds/${req.params.id}`);
      }
   });
});

module.exports = router;