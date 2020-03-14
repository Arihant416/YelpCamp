const express = require('express'),
	  app = express(),
	  bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      Campground=require('./models/campground'),
      Comment=require('./models/comment'),
      seedDB=require('./seeds');



mongoose.connect("mongodb://localhost:27017/yelp",{useNewUrlParser:true,useUnifiedTopology:true},function(error) {});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
seedDB();

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
            res.render("campgrounds/index",{campgrounds:allcampgrounds})
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

app.get("/campgrounds/:id/comments/new",function(req,res){
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

app.post("/campgrounds/:id/comments",(req,res)=>{
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
app.listen(2000,function(){
    console.log("The Yelpcamp server's on...");
});
