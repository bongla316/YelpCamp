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
router.get("/new", function (req, res) {
   res.render("campgrounds/new");
});

// CREATE Route - add new campground to database and display it
router.post("/", function (req, res) {
   // Get data from form and add to database
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;

   var newCampground = {
      name: name,
      image: image,
      description: description
   };

   Campground.create(newCampground, function (err, campground) {
      if (err) {
         console.log(err);
      } else {
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

module.exports = router;