var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
   {
      name: "Cloud's Rest",
      image: "https://pixabay.com/get/e83cb30621f41c22d2524518b7444795ea76e5d004b0144293f0c97ba0efb1_340.jpg",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
   },
   {
      name: "Meridian Campground",
      image: "https://pixabay.com/get/eb30b00d21f0053ed1584d05fb1d4e97e07ee3d21cac104496f6c17ca0eeb7ba_340.jpg",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
   },
   {
      name: "Jotenheim Canyon",
      image: "https://pixabay.com/get/e832b50f21f3023ed1584d05fb1d4e97e07ee3d21cac104496f6c171a5ebbdbd_340.jpg",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
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

