var express = require('express');
var router = express.Router();

const message_controller = require("../controllers/messageController");

router.get('/new-post', message_controller.new_message_get);

router.post("/new-post", message_controller.new_message_post);

// router.post("/delete-post", message_controller.new_message_post);

router.get("/message/:id", message_controller.message_detail);

module.exports = router;