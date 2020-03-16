var express=require('express');
var router=express.Router();
var Campground=require('../models/campground');
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
//New ROute
router.get("/new",function(req,res){
    res.render("campgrounds/new");
})
router.post("/",function(req,res){
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