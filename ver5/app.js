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

mongoose.connect('mongodb://localhost:27017/yelp', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, function(error) {});

seedDB();
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


app.get("/",function(req,res){
    res.render("landing");
});
app.get("/campgrounds",function(req,res){
    //Get all campgrounds from DB
    Campground.find({},function(err,allcampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds:allcampgrounds, currentUser:req.user})
        }
    })
    
    //res.render("campgrounds",{campgrounds:campgrounds});
});
app.get("/campgrounds/new",function(req,res){
    res.render("campgrounds/new");
})
app.post("/campgrounds",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var desc= req.body.image;
    var newCampground={name:name,image:image,desc:desc};
    //campgrounds.push(newCampground);
    //Create a new Campground and save to db
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    })
    // res.redirect("/campgrounds");
    //get data from form add to campgrounds array
});
//SHow -more info about one compound
app.get("/campgrounds/:id",(req,res)=>{
    //find the campground with provided ID
    //USing FindById()
    Campground.findById(req.params.id).populate("comments").exec((err,foundCampground)=>{
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });
    //render show template with that campground
    
});
//===================================================
//COMMENTS ROUTES
//===================================================

app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
    //find the campground by id 
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground: campground});
        }
    });
    // res.render('comments/new');
});

app.post("/campgrounds/:id/comments",isLoggedIn,(req,res)=>{
    //lookup campground using id
    //Create New Comment
    //Connect new comment to Campground
    //redirect campground show page
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
            })
        }
    })
});
//================
//==AUTH Routes==
//==============
app.get("/register",function(req,res){
    res.render("register");
});
//Handling Sign Up Logic

app.post("/register",function(req,res){
    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");
        });
    });
});

//Show Login Form
app.get("/login",(req,res)=>{
    res.render("login");
});
//handling login logic
app.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req,res){
});

//Logout Route
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(2000,function(){
    console.log("The Yelpcamp server's on...");
});
