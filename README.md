# YelpCamp
A web application dedicated to review campgrounds

- Tools used:
   * HTML
   * CSS
   * Javascript
   * NodeJS (Backend)
   * ExpressJS
   * EJS for templating
   * MongoDB (future)

# Detailed log of each version and the progress made

- Version 1 (06/08/18):
   - Basic setup for landing page on local host port: 3000
   - 09/08/18:
      - Added aditional routes to app,js for initial routing.
      - Also added a fixed array of three fictional campgrounds and images to allow me to work on the layout of the web app
      - Added partials route to correctly set up the header and footer for each template page and to include any links (e.g. bootstrap)
      - Updated app.js to add a post route to /campgrounds
      - Updated app.js to add a get routee to /campgrounds/new where new.ejs contains a simple form to add a new campground
      - Added bootstrap to the webapp
      - Added bootstrap navbar and implemented grid system for a more responsive and pleasing design
      - Made the form on the /campgrounds/new page more pleasing to the eye

- Version 2 (11/08/18):
   - Install and configure mongoose
   - Setup campground model for the database
   - Use the campground model to display campgrounds instead of routes
   - Implemented INDEX, NEW, SHOW and CREATE routes for RESTFul Routing standards
   - Cleared current database
   - Added new description input when adding new campgrounds
   - Modified current code to add description to code objects
   - Added a 'More Info' button under each campgrounds which redirects to a different webpage with the description and a larger image
   - Gave each campground in the database a unique id so it can easily be referenced

- Version 3 (01/09/18):
   - Added new branch for version 3 which will implement a comments section
   - Began refactoring app.js to separate any database models such as Campground
   - Adding seed file to pass some test data

- Version 4 (04/09/18):
   - Implemented a fully fledged comment model allowing user to post a comment that is stored on the database
   - Implemented nested routes for comments. (e.g. /campgrounds/:id/comments/new)
   - Implemented GET and POST routes for comment which renders a form to add a comment and then associates that comment with the selected campground respectively

- Version 5 (04/09/18):
   - Style the show.ejs template page to add a sidebar, padding, thumbnails etc
   - Created a public directory which will serve the main.css stylesheet and any other stylesheets in the future
   - Styled the show page for each campground with new images and longer descriptions
   - Used bootstrap grid to achieve the layout

- Version 6 (12/09/18):
   - Added passport.js for authentication and user accounts

- Version 7:
   - Refactored the project to simplify app.js and moved routes to their own specific files in the routes directory

- Version 8:
   - Added user association to comments

- Version 9:
   - Added user association to newly created campgrounds

# Current todo list
* Add authentication for users to create accounts
* Associate accounts to comments and pictures uploaded etc
* Add code to update and destroy data in the database when required
* Further styling of the web page
