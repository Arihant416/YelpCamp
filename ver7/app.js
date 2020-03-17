const express = require('express'),
	  app = express(),
	  bodyParser = require('body-parser'),
	  mongoose = require('mongoose'),
	  passport = require('passport'),
	  LocalStrategy = require('passport-local'),
	  User = require('./models/user'),
	  Campground = require('./models/campground'),
	  seedDB = require('./seeds'),
      Comment = require('./models/comment');
 
      //REQUIRING ROUTES
const commentRoutes=require("./routes/comments"),
      campgroundRoutes=require("./routes/campgrounds"),
      indexRoutes=require("./routes/index");

mongoose.connect('mongodb://localhost:27017/yelp', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, function(error) {});

//seedDB();  //seed the database
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Passport Configuration
app.use(require('express-session')({
	secret: "Million Years Ago",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// To make user info available in all the routes
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);



app.listen(2000,function(){
    console.log("The Yelpcamp server's on...");
});
