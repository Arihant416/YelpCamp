const express=require('express'),
      router=express.Router({mergeParams:true}),
      Campground=require("../models/campground"),
      Comment=require("../models/comment");

//Comments new
router.get("/new",isLoggedIn,function(req,res){
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

//Comments Create
router.post("/",isLoggedIn,(req,res)=>{
    //lookup campground using id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment,function(err,comment){
                if (err) {
					console.log(err);
				} else {
					// Add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// Save the comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					res.redirect("/campgrounds/" + campground._id);
				}
            });
        }
    });
});
//Middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports=router;