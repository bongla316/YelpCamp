var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
   {
      name: "Cloud's Rest",
      image: "https://pixabay.com/get/eb30b00d21f0053ed1584d05fb1d4e97e07ee3d21cac104496f5c87ba6efb0ba_340.jpg",
      description: "Test 1: Blah blah blah"
   },
   {
      name: "Meridian Campground",
      image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f5c878a5e8b7b8_340.jpg",
      description: "Test 2: Blah blah blah"
   },
   {
      name: "Jotenheim Canyon",
      image: "https://pixabay.com/get/e832b50f21f3023ed1584d05fb1d4e97e07ee3d21cac104496f5c871afe9bdbe_340.jpg",
      description: "Test 3: Blah blah blah"
   }
];

function seedDB(){
   // Remove all campgrounds
   Campground.remove({}, function(err){
      if(err){
         console.log(err);
      }
      console.log("Campground database cleared");
      
      // Add random campgrounds
      data.forEach(seed => {
         Campground.create(seed, function(err, data){
            if(err){
               console.log(err);
            } else {
               console.log("Added a campground");
               // Add a few comments
               Comment.create(
                  {
                     text: "Awesome place...no wifi!",
                     author: "Kratos"
                  }, function(err, comment){
                     if(err){
                        console.log(err);
                     } else {
                        data.comments.push(comment);
                        data.save();
                        console.log("New comment created");
                     }
                  });
            }
         });
      });
   });
}

module.exports = seedDB;

