
var express= require("express");
var app=express();
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");
var campgrounds=[
    {name:"Salmon Creek",image:"https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
    {name:"Nigaaa",image:"https://images.unsplash.com/photo-1559697242-07e90b48b9fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80"},
    {name:"The Black Cat",image:"https://images.unsplash.com/photo-1551989144-f79abbfbe678?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"},
    {name:"The Raven",image:"https://images.unsplash.com/photo-1572608562395-3acc75d73cc5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80"},
    {name:"Horse Rassille",image:"https://images.unsplash.com/photo-1563443805649-1cc4f228161b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"},
    {name:"Tortoise",image:"https://images.unsplash.com/photo-1568660357733-823cbddb0f6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"},
    {name:"ROss",image:"https://images.unsplash.com/photo-1548496310-5cf0545a63f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"},
    {name:"Single Ass",image:"https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1068&q=80"},
    {name:"Saanp Banch",image:"https://images.unsplash.com/photo-1512068428481-cf167c9f2bd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"}
]
app.get("/",function(req,res){
    res.render("landing");
});
app.get("/campgrounds",function(req,res){
    
    res.render("campgrounds",{campgrounds:campgrounds});
});
app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
})
app.post("/campgrounds",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var newCampground={name:name,image:image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
    //get data from form add to campgrounds array
})

app.listen(2000,function(){
    console.log("The Yelpcamp server's on...");
})