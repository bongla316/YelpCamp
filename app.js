var express = require("express"),
   app = express(),
   bodyParser = require("body-parser"),
   mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
   useNewUrlParser: true
});
app.use(bodyParser.urlencoded({
   extended: true
}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//       name: "Granit Hill",
//       image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
//       description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
//    },
//    function (err, campground) {
//       if (err) {
//          console.log(err);
//       } else {
//          console.log("Newly created campground: ");
//          console.log(campground);
//       }
//    }
// );

app.get('/', function (req, res) {
   res.render("landing");
});

// INDEX Route - Show all campgrounds
app.get('/campgrounds', function (req, res) {
   // Get all campgrounds from DB
   Campground.find({}, function (err, campgrounds) {
      if (err) {
         console.log(err);
      } else {
         res.render("index", {
            campgrounds: campgrounds
         });
      }
   });
});

// NEW - show form to create new campground
app.get("/campgrounds/new", function (req, res) {
   res.render("new.ejs");
});

// CREATE Route - add new campground to database and display it
app.post("/campgrounds", function (req, res) {
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
app.get("/campgrounds/:id", function (req, res) {
   // Find campground with provided ID
   Campground.findById(req.params.id, function(err, foundCampground){
      if(err) {
         console.log(err);
      } else {
         // Render campground with corresponding ID
         res.render("show", {campground: foundCampground});
      }
   });
});

app.listen('3000', function () {
   console.log("The YelpCamp Server Has Started!");
});