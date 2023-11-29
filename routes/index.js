var express = require('express');
const index_controller = require("../controllers/indexController");
var router = express.Router();

/* GET home page. */
router.get('/', index_controller.home_get);

router.get('/log-in', function(req, res, next) {
  res.render("log-in", { title: 'Log In', user: req.user, errors: null });
});

router.get('/about', function(req, res, next) {
  res.render("about", { title: 'About', user: req.user });
});

module.exports = router;
