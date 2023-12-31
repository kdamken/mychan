var express = require('express');
var router = express.Router();
const User = require("../models/user");
const user_controller = require("../controllers/userController");
const LocalStrategy = require("passport-local").Strategy;
var passport = require('passport');
const bcrypt = require("bcryptjs");

router.get('/sign-up', user_controller.sign_up_form_get);
router.post("/sign-up", user_controller.sign_up_form_post);

router.get('/become-a-member', user_controller.become_a_member_get);
router.post('/become-a-member', user_controller.become_a_member_post);

router.get('/become-an-admin', user_controller.become_an_admin_get);
router.post('/become-an-admin', user_controller.become_an_admin_post);

// These three are used when passport actually runs
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      console.log('xyz passport user result', user);
      if (!user) {
        console.log('xyz passport user result done');
        return done(null, false, { message: "Username not found" });
      };
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        console.log("xyz password doesn't match stored value!")
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" })
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    };
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});

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
