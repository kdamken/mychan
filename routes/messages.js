var express = require('express');
var router = express.Router();

const message_controller = require("../controllers/messageController");

router.get('/new-post', message_controller.new_message_get);

router.post("/new-post", message_controller.new_message_post);


router.get("/message/:id", message_controller.message_detail_get);
router.get("/message/:id/delete", message_controller.message_delete_get);
router.post("/message/:id/delete", message_controller.message_delete_post);

module.exports = router;