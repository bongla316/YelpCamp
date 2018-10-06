var   express        = require("express"),
      app            = express(),
      bodyParser     = require("body-parser"),
      mongoose       = require("mongoose"),
      passport       = require("passport"),
      LocalStrategy  = require("passport-local"),
      methodOverride = require("method-override"),
      flash          = require("connect-flash"),
      Campground     = require("./models/campground"),
      Comment        = require("./models/comment"),
      User           = require("./models/user"),
      seedDB         = require("./seeds");

// =============================================================================
// Route files
// =============================================================================
var   campgroundRoutes  = require("./routes/campgrounds"),      
      commentRoutes     = require("./routes/comments"),
      indexRoutes       = require("./routes/index");

// =============================================================================
// Mongoose & General Config
// =============================================================================
mongoose.connect("mongodb://localhost:27017/yelp_camp_v13", {
   useNewUrlParser: true
});
app.use(bodyParser.urlencoded({
   extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB();

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
   res.locals.currentUser  = req.user;
   res.locals.success      = req.flash("success");
   res.locals.error        = req.flash("error");   
   next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP);
