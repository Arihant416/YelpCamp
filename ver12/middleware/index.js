// All the middleWare are included here
var Campground = require('../models/campground')
var Comment = require('../models/comment')

var middlewareObj = {}

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function (err, foundCampground) {
      if (err) {
        req.flash('error', 'Campground not found!!')
        res.render('back')
      } else {
        //does the user own the campground
        if (
          foundCampground.author.id.equals(req.user._id) ||
          req.user.isAdmin
        ) {
          next()
        } else {
          req.flash('error', 'Access Denied')
          res.redirect('back')
        }
      }
    })
  } else {
    req.flash('error', "You've got no access to this")
    res.redirect('back')
  }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
      if (err) {
        req.flash('error', 'Error in finding Comment')
        res.render('back')
      } else {
        //does the user own the Comment
        if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
          next()
        } else {
          req.flash('Authorization Denied..!')
          res.redirect('back')
        }
      }
    })
  } else {
    req.flash('error', 'Login to add/Edit/Delete Your Comment.')
    res.redirect('back')
  }
}

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('error', 'You need to be logged in..!!')
  res.redirect('/login')
}

module.exports = middlewareObj
