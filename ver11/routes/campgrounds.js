const express=require('express'),
      router=express.Router(),
      Campground=require('../models/campground'),
      Comment=require("../models/comment");
      middleware=require('../middleware');

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
//NEW CAmp
router.get("/new",middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});
router.post("/",middleware.isLoggedIn,function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var cost = req.body.cost;
    var desc= req.body.desc;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newCampground = {name: name, image: image, cost: cost, description: desc, author:author};    //campgrounds.push(newCampground);
    //Create a new Campground and save to db
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreated);
            res.redirect("/campgrounds/"+newlyCreated._id);
        }
    });
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

//EDIT Campground Route 
router.get('/:id/edit',middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        res.render("campgrounds/edit",{campground:foundCampground});             
    });
});
// UPDATE Campground Route
router.put("/:id",middleware.checkCampgroundOwnership, function(req,res){
    //find and update the correct Campground
    
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,(err,updatedCampground)=>{
        if(err){
            req.flash("error","Error in Updating the Campground ");
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    //redirect somewhere(show Page)
});

//DESTROY Campground Route
router.delete("/:id",middleware.checkCampgroundOwnership, (req,res)=>{
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            req.flash("error","Error Occured in Deleting the Campground")
            res.redirect("/campgrounds");
        } else{
            req.flash("success","Successfully deleted the Campground");
            res.redirect('/campgrounds');
        }
    })
});


module.exports=router;