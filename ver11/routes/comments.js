const express=require('express'),
      router=express.Router({mergeParams:true}),
      Campground=require("../models/campground"),
      Comment=require("../models/comment");
      middleware=require('../middleware');

//Comments new
router.get("/new",middleware.isLoggedIn,function(req,res){
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
router.post("/",middleware.isLoggedIn,(req,res)=>{
    //lookup campground using id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment,function(err,comment){
                if (err) {
                    req.flash("error","Something went Wrong!!!");
					console.log(err);
				} else {
					// Add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// Save the comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success","Comment added Successfully")
					res.redirect("/campgrounds/" + campground._id);
				}
            });
        }
    });
});
// EDIT ROUTE
router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, (err, foundComment) => {
		if (err) {
			res.redirect("back");
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});	
		}
	});
});

//COMMENT UPDATE  
router.put("/:comment_id", middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/"+ req.params.id)
        }
    });
});
// Comment Destroy Route
router.delete("/:comment_id",middleware.checkCommentOwnership,(req,res)=>{
    //findbyId and Remove
    Comment.findByIdAndRemove(req.params.comment_id,(err)=>{
        if(err){
            res.redirect("back");
        } else{
            req.flash("success","Comment Successfully Deleted")
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})



module.exports=router;