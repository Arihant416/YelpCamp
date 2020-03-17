const express=require('express'),
      router=express.Router(),
      Campground=require('../models/campground'),
      Comment=require("../models/comment");

//Index -Show all Campgrounds
router.get("/",function(req,res){
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
router.post("/",isLoggedIn,function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var desc= req.body.desc;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newCampground={name:name,image:image,description:desc,author:author};
    //campgrounds.push(newCampground);
    //Create a new Campground and save to db
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    })
    // res.redirect("/campgrounds");
    //get data from form add to campgrounds array
});
//New ROute
router.get("/new",isLoggedIn, function(req,res){
    res.render("campgrounds/new");
})

//SHow -more info about one compound
router.get("/:id",(req,res)=>{
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

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports=router;