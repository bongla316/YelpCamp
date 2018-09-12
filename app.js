var   express        = require("express"),
      app            = express(),
      bodyParser     = require("body-parser"),
      mongoose       = require("mongoose"),
      passport       = require("passport"),
      LocalStrategy  = require("passport-local"),
      Campground     = require("./models/campground"),
      Comment        = require("./models/comment"),
      User           = require("./models/user"),
      seedDB         = require("./seeds");

mongoose.connect("mongodb://localhost:27017/yelp_camp_v6", {
   useNewUrlParser: true
});
app.use(bodyParser.urlencoded({
   extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

seedDB();

// =============================================================================
// PASSPORT.JS CONFIGURATION
// =============================================================================

app.use(require("express-session")({
   secret: "YelpCamp example secret to generate hash",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware for every route to check if a user is logged in (for header)
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

// =============================================================================
// WEB PAGE ROUTES
// =============================================================================

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
         res.render("campgrounds/index", {
            campgrounds: campgrounds
         });
      }
   });
});

// NEW - show form to create new campground
app.get("/campgrounds/new", function (req, res) {
   res.render("campgrounds/new");
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

// =============================================================================
// COMMENT ROUTES
// =============================================================================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function (req, res) {
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

app.post("/campgrounds/:id/comments", isLoggedIn, function (req, res) {
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
               // Connect new comment to campground
               campground.comments.push(comment);
               campground.save();
               // Redirect campground to show page b
               res.redirect(`/campgrounds/${campground._id}`);
            }
         });
      }
   });

});

// =============================================================================
// AUTHENTICATION ROUTES
// =============================================================================

// Show register form
app.get("/register", function (req, res) {
   res.render("register");
});

// Handle sign up logic
app.post("/register", function (req, res) {
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
app.get("/login", function (req, res) {
   res.render("login");
});

// Login logic
app.post("/login", passport.authenticate("local", {
   successRedirect: "/campgrounds",
   failureRedirect: "/login"
}), function (req, res) {
   
});

// Logout route
app.get("/logout", function(req, res){
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

app.listen('3000', function () {
   console.log("The YelpCamp Server Has Started!");
});