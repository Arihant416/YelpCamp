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
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req,res,function(){
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
    res.redirect("/campgrounds");
});
//MiddleWare to check if somebody is logged in!
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports=router;