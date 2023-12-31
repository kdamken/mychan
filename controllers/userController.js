const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.sign_up_form_get = function(req, res, next){
  res.render("sign-up-form", { title: 'Sign Up', user: req.user, errors: null });
}

exports.sign_up_form_post = [
  // body("first_name", "First name must not be empty.")
  //   .trim()
  //   .isLength({ min: 1 })
  //   .escape(),
  // body("last_name", "Last name must not be empty.")
  //   .trim()
  //   .isLength({ min: 1 })
  //   .escape(),
  body("username", "Username must not be empty and be at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  // body("email", "Email must not be empty")
  //   .trim()
  //   .isLength({ min: 1 })
  //   .escape(),
  body("password", "Password must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('passwordConfirmation').custom((value, { req }) => {
    return (value !== '') && value === req.body.password
  }).withMessage('Please ensure the password confirmation matches the password entered.'),
  asyncHandler(async (req, res, next) => {
    console.log('xyz trying to sign up post');
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a user object with escaped and trimmed data.
    // const user = new User({
    //   // first_name: req.body.first_name,
    //   // last_name: req.body.last_name,
    //   username: req.body.username,
    //   // email: req.body.email,
    //   password: req.body.password,
    // });

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
      res.render("sign-up-form", {
        title: "Sign Up",
        user: req.user,
        errors: errors.array(),
      });
    } else {
      console.log('xyz no errors, trying to save');

      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        try {
          console.log('attempting to hash password');
          const user = new User({
            // first_name: req.body.first_name,
            // last_name: req.body.last_name,
            username: req.body.username,
            // email: req.body.email,
            password: hashedPassword,
            member: false,
            admin: false
          });
          const result = await user.save();
          res.redirect("/");
        } catch(err) {
          return next(err);
        };
      });
      // // Data from form is valid. Save book.
      // await user.save();
      // res.redirect('/');
    }
  })
];

exports.become_a_member_get = asyncHandler(async (req, res, next) => {
  if (req.user) {
    console.log('xyz req.user', req.user)
    res.render("become-a-member", { title: 'Become a Member', user: req.user, errors: null });
  } else {
    res.redirect("/");
  }
});

exports.become_a_member_post = [
  body("passcode", "Passcode needs to be entered and correct")
    .trim()
    .equals('code')
    .escape(),
  asyncHandler(async (req, res, next) => {
    console.log('xyz trying to post message');
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    console.log('xyz req.user', req.user)

    // Create a user object with escaped and trimmed data.
    const user = new User({
      user: req.user.password,
      password: req.user.password,
      member: true,
      admin: false,
      _id: req.user._id
    });

    if (!errors.isEmpty()) {
      console.log('xyz there are errors', errors);
      // There are errors. Render form again with sanitized values/error messages.

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

      res.render("become-a-member", { title: 'Become a Member', user: req.user, errors: errors.array() });
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
      await User.findByIdAndUpdate(req.user._id, user, {});
      res.redirect('/');
    }
  })
]

exports.become_an_admin_get = asyncHandler(async (req, res, next) => {
  if (req.user) {
    console.log('xyz req.user', req.user)
    res.render("become-an-admin", { title: 'Become an Admin', user: req.user, errors: null });
  } else {
    res.redirect("/");
  }
});

exports.become_an_admin_post = [
  body("passcode", "Passcode needs to be entered and correct")
    .trim()
    .equals('tobi')
    .escape(),
  asyncHandler(async (req, res, next) => {
    console.log('xyz trying to post message');
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    console.log('xyz req.user', req.user)

    // Create a user object with escaped and trimmed data.
    const user = new User({
      user: req.user.password,
      password: req.user.password,
      member: true,
      admin: true,
      _id: req.user._id
    });

    if (!errors.isEmpty()) {
      console.log('xyz there are errors', errors);
      // There are errors. Render form again with sanitized values/error messages.

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

      res.render("become-an-admin", { title: 'Become an Admin', user: req.user, errors: errors.array() });
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
      await User.findByIdAndUpdate(req.user._id, user, {});
      res.redirect('/');
    }
  })
]