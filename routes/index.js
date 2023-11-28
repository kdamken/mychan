var express = require('express');
const index_controller = require("../controllers/indexController");
const message_controller = require("../controllers/messageController");
const user_controller = require("../controllers/userController");
const passport = require('passport')
var router = express.Router();

/* GET home page. */
router.get('/', index_controller.home_get);

router.get('/log-in', function(req, res, next) {
  res.render("log-in", { title: 'Log In', user: req.user });
});

router.get('/about', function(req, res, next) {
  res.render("about", { title: 'About', user: req.user });
});

// router.get('/new-post', function(req, res, next) {
//   console.log('xyz req.user', req.user)
//   res.render("new-post", { title: 'New Post', user: req.user });
// });

// router.post("/new-post", message_controller.new_message_post);

// router.get('/sign-up', function(req, res, next) {
//   res.render("sign-up-form", { title: 'Sign Up', user: req.user });
// });

// router.post("/sign-up", user_controller.sign_up_form_post);

// router.post('/new-post', function(req, res, next) {
//   res.render("new-post", { title: 'New Post', user: req.user });
// });

router.post("/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});


module.exports = router;
