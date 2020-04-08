const express = require ('express'),
  router = express.Router (),
  passport = require ('passport'),
  User = require ('../models/user'),
  Campground = require ('../models/campground');

//Root Route
router.get ('/', function (req, res) {
  res.render ('landing');
});

// Auth Routes

// show register form
router.get ('/register', function (req, res) {
  res.render ('register', {page: 'register'});
});

//show login form
router.get ('/login', function (req, res) {
  res.render ('login', {page: 'login'});
});
//Handling Sign Up Logic

router.post ('/register', function (req, res) {
  var newUser = new User ({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    avatar: req.body.avatar,
  });
  if (req.body.adminCode === 'hashcode1') {
    newUser.isAdmin = true;
  }
  User.register (newUser, req.body.password, function (err, user) {
    if (err) {
      console.log (err);
      return res.render ('register', {error: err.message});
    }
    passport.authenticate ('local') (req, res, function () {
      req.flash ('success', 'Welcome To YelpCamp, ' + user.username);
      res.redirect ('/campgrounds');
    });
  });
});

//handling login logic
router.post (
  '/login',
  passport.authenticate ('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login',
  }),
  function (req, res) {}
);

//Logout Route
router.get ('/logout', function (req, res) {
  req.logout ();
  req.flash ('success', 'Logged You Out Successfully !');
  res.redirect ('/campgrounds');
});

//USER's profile
router.get ('/users/:id', function (req, res) {
  User.findById (req.params.id, function (err, foundUser) {
    if (err) {
      req.flash ('error', 'Something went Wrong');
      res.redirect ('/');
    }
    Campground.find ()
      .where ('author.id')
      .equals (foundUser._id)
      .exec (function (err, campgrounds) {
        if (err) {
          req.flash ('error', 'Something went Wrong');
          res.redirect ('/');
        }
        res.render ('users/show', {user: foundUser, campgrounds: campgrounds});
      });
  });
});

module.exports = router;
