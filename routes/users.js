var express = require('express');
var router = express.Router();

const user_controller = require("../controllers/userController");

router.get('/become-a-member', user_controller.become_a_member_get);
router.post('/become-a-member', user_controller.become_a_member_post);

router.get('/sign-up', function(req, res, next) {
  res.render("sign-up-form", { title: 'Sign Up', user: req.user });
});

router.post("/sign-up", user_controller.sign_up_form_post);

module.exports = router;
