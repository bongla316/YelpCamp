// Express.js Router config
var express = require("express");
var router  = express.Router();

var Campground = require("../models/campground");

// =============================================================================
// CAMPGROUND ROUTES
// =============================================================================

// INDEX Route - Show all campgrounds
router.get('/', function (req, res) {
   // Get all campgrounds from DB
   Campground.find({}, function (err, campgrounds) {
      if (err) {
         console.log(err);
      } else {
         res.render("campgrounds/index", {
            campgrounds: campgrounds
         });
      }
   });
});

// NEW - show form to create new campground
router.get("/new", isLoggedIn, function (req, res) {
   res.render("campgrounds/new");
});

// CREATE Route - add new campground to database and display it
router.post("/", isLoggedIn, function (req, res) {
   // Get data from form and add to database
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;

   var author = {
      id: req.user._id,
      username: req.user.username
   };
   var newCampground = {
      name: name,
      image: image,
      description: description,
      author: author
   };
   Campground.create(newCampground, function (err, campgroundAdded) {
      if (err) {
         console.log(err);
      } else {
         console.log(campgroundAdded);
         res.redirect("/campgrounds");
      }
   });
});

// SHOW Route - Shows info about one campground (/campgrounds/:id)
router.get("/:id", function (req, res) {
   // Find campground with provided ID
   Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
      if (err) {
         console.log(err);
      } else {
         // Render campground with corresponding ID
         res.render("campgrounds/show", {
            campground: foundCampground
         });
      }
   });
});

// EDIT ROUTE - Edit submitted campground
router.get("/:id/edit", checkCampgroundOwnership, function(req, res){
   // Check if user is logged in
   Campground.findById(req.params.id, function(err, foundCampground){
      res.render("campgrounds/edit", {campground: foundCampground});
   });
});

// UPDATE ROUTE - Update edited campground
router.put("/:id", checkCampgroundOwnership, function(req, res){
   // Find and update campground
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
      if(err) {
         res.redirect("/campground");
      } else {
         res.redirect(`/campgrounds/${req.params.id}`);
      }
   });
});

// DESTROY ROUTE - Delete a posted campground
router.delete("/:id", checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err, foundCampground){
      if(err) {
         res.redirect("/campgrounds");
      } else {
         res.redirect("/campgrounds");
      }
   });
});

// =============================================================================
// MIDDLEWARE FUNCTIONS
// =============================================================================

// Check if user is logged in
function isLoggedIn(req, res, next){
   if(req.isAuthenticated()){
      return next();
   }
   return res.redirect("/login");
}
// Check if user has authorization
function checkCampgroundOwnership(req, res, next){
   // Check is someone is logged in first and if true, check if user owns the campground
   if(req.isAuthenticated()){
      Campground.findById(req.params.id, function(err, foundCampground){
         if(err){
            res.redirect("back");
         } else {
            if (foundCampground.author.id.equals(req.user._id)) {
               next();
            } else {
               res.redirect("back");
            }
         }
      });

   } else {
      res.redirect("back");
   }
}

module.exports = router;