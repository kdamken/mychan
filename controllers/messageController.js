const Message = require("../models/message");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.new_message_get = function(req, res, next) {
  console.log('xyz new_message_get req.user', req.user)
  res.render("new-post", { title: 'New Post', user: req.user, errors: null });
}

exports.new_message_post = [
  body("message", "Message must not be empty and be at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("user", "Need a user to post")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    console.log('xyz trying to post message');
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    console.log('xyz ')

    // Create a user object with escaped and trimmed data.
    const message = new Message({
      message: req.body.message,
      user: req.body.user,
      date: new Date,
    });

    if (!errors.isEmpty()) {
      console.log('xyz there are errors', errors);
      // // There are errors. Render form again with sanitized values/error messages.

      // // Get all authors and genres for form.
      // const [allAuthors, allGenres] = await Promise.all([
      //   Author.find().exec(),
      //   Genre.find().exec(),
      // ]);

      // // Mark our selected genres as checked.
      // for (const genre of allGenres) {
      //   if (book.genre.includes(genre._id)) {
      //     genre.checked = "true";
      //   }
      // }
      // res.render("book_form", {
      //   title: "Create Book",
      //   authors: allAuthors,
      //   genres: allGenres,
      //   book: book,
      //   errors: errors.array(),
      // });
    } else {
      console.log('xyz no errors, trying to save');

      // Data from form is valid. Save book.
      await message.save();
      res.redirect('/');
    }
  })
];

exports.message_detail_get = asyncHandler(async (req, res, next) => {
  console.log('xyz trying to view message detail')
  const message = await Message.findById(req.params.id).populate('user').exec();
  console.log('xyz message', message);

  res.render("message-detail", { title: 'Message Detail', user: req.user, message: message });
});

exports.message_delete_get = asyncHandler(async (req, res, next) => {
  console.log('xyz trying to view message delete')
  const message = await Message.findById(req.params.id).populate('user').exec();
  console.log('xyz message', message);

  res.render("message-delete", { title: 'Delete Message', user: req.user, message: message });
});

exports.message_delete_post = asyncHandler(async (req, res, next) => {
  // console.log('xyz trying to view message delete')
  // const message = await Message.findById(req.params.id).populate('user').exec();
  // console.log('xyz message', message);

  console.log('xyz trying to delete messageid', req.body.messageid)
  await Message.findByIdAndDelete(req.body.messageid);
  res.redirect("/");
});