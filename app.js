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
   image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

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
         res.render("campgrounds", {
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
   
   var newCampground = {
      name: name,
      image: image
   };
   
   Campground.create(newCampground, function(err, campground){
      if(err) {
         console.log(err);
      } else {
         res.redirect("/campgrounds");
      }
   });   
});

app.listen('3000', function () {
   console.log("The YelpCamp Server Has Started!");
});