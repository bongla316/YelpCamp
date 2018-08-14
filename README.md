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

# Current todo list
- Style the show.ejs template 
