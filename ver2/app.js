const express = require('express'),
	  app = express(),
	  bodyParser = require('body-parser'),
	  mongoose = require('mongoose');
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

mongoose.connect("mongodb://localhost:27017/yelp",{useNewUrlParser:true,useUnifiedTopology:true},function(error) {});


var campgroundSchema=new mongoose.Schema({
    name:String,
    image:String,
    desc:String
});
var Campground=mongoose.model("Campground",campgroundSchema);
// Campground.create({
//     name:"Salmon Creek",
//     image:"https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//     desc:"This is a Biker nigga"
// },function(err,campground){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Newly Created Campground");
//         console.log(campground);
//     }
// });


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
            res.render("index",{campgrounds:allcampgrounds})
        }
    })
    
    //res.render("campgrounds",{campgrounds:campgrounds});
});
app.get("/campgrounds/new",function(req,res){
    res.render("new");
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
    Campground.findById(req.params.id,(err,foundCampground)=>{
        if(err){
            console.log(err);
        }else{
            res.render("show",{campground:foundCampground});
        }
    });
    //render show template with that campground
    
});

app.listen(2000,function(){
    console.log("The Yelpcamp server's on...");
});
