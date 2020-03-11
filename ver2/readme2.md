                            ======YelpCamp=====
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