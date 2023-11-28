const User = require("../models/user");
const Message = require("../models/message");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.home_get = asyncHandler(async (req, res, next) => {
  console.log('xyz trying to get home page');
  const messages = await Message.find({})
    .sort({ date: -1 })
    .populate("user")
    .exec();

  console.log('xyz messages', messages);
  res.render("index", { title: 'myChan', user: req.user, messages: messages, errors: null });
})

