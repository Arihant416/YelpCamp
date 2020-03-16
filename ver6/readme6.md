                            =====YelpCamp=====
## V1
<hr>

* npm init
* Install the packages express and ejs
* Add the routes to Landing and CampGrounds Page
* Styling of layout
    * Create header and footer in partials
    * Link bootstrap cdn
* Create new Campgrounds
    * Set the POST route
    * Include the body-parser package (<em>npm install body-parser --save</em>)
    * Set Route to Show form

* Style the CampGrounds Page
    * Display in Grids
* Style the Navbar and Form
    * Add navbar to all the templates
    * Style the new CampGround form

## V2
<hr>

* Add Mongoose
    * Install and Configure Mongoose
    * Setup a CampGround Model
    * Use Campground model in the routes

* Show Page
    * Implement RESTful Routes
    * Add description to Campgrounds
    * Show db.collection.drop()
    * Note: "/campgrounds/new" route has to be defined before the "/campgrounds/:id" route, so as to avoid collision between id and new
    as ":id" means anything alphanumeric be it new or 1.

## V3
<hr>

* Refactor Mongoose Code
    * Create a models directory
    * Use module.exports
    * Require appropriately

* Add Seeds file
    * Add a seeds.js file
    * Automate the seeds file everytime the server is started

* Add the Comment Model
    * Display Comments on campgrounds show page

* Comments New/Create
    * Discuss Nested Routes
    * Add the comment new and create Route
    * Add the form 

## V4
<hr>

* Style Show Page
    * Add a sideBar to Show Page
    * Display Comments in an elegant way

* Add Custom CSS file
    * Style the Show page

## V5
<hr>

* Auth Part-1 Add Packages needed  for authentication
    * Install all packages needed for auth
    * Define User model

* Auth Part-2 Register
    * Configure Passport 
    * Add register routes
    * Add register template

* Auth Part-3 Login
    * Add Login routes
    * Add Login Templates

* Auth Part-4 Logout/Navbar
    * Add Logout Route
    * Prevent user from adding comment if not signed in
    * Add Links to Navbar

* Auth Part-5 Show/Hide Links 
    * Show/Hide auth Links in navbar Correctly

## V6
<hr>

* Refactor the Routes
    * Use Express router to recognize all routes