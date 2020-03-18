const express=require('express'),
      router=express.Router(),
      passport=require('passport'),
      User=require("../models/user");

//Root Route
router.get("/",function(req,res){
    res.render("landing");
});


// Auth Routes

//Show register form
router.get("/register",function(req,res){
    res.render("register");
});
//Handling Sign Up Logic

router.post("/register",function(req,res){
    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            req.flash("error",err.message);
            return res.redirect("/register")
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome To YelpCamp, "+ user.username);
            res.redirect("/campgrounds");
        });
    });
});

//Show Login Form
router.get("/login",(req,res)=>{
    res.render("login");
});
//handling login logic
router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req,res){
});

//Logout Route
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged You Out Successfully !")
    res.redirect("/campgrounds");
});

module.exports=router;