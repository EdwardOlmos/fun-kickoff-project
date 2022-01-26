const { check, validationResult } = require("express-validator");

exports.validateRegister = [
  check("username", "Please enter a username").not().isEmpty(),
  check("email", "Please enter a valid email address").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({
    min: 6
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  }
];

exports.validateLogin = [
  check("email", "Please enter a valid email address").isEmail(),
  check("password", "Password is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  }
];

exports.validateProfile = [
  check("userId", "Please login").not().isEmpty(),
  check("firstName", "Please enter your first name").not().isEmpty().trim().escape(),
  check("lastName", "Please enter your last name").not().isEmpty().trim().escape(),
  check("gender", "Please enter a supported gender option").not().isEmpty().toLowerCase().isIn(['male', 'female', 'other']),
  check("phoneNumber", "Please enter your phone number").not().isEmpty().trim().escape(),
  check("address", "Please enter your address").not().isEmpty().trim().escape(),
  check("description", "Please enter a description").not().isEmpty().trim().escape(),
  check("photoUrl", "Please enter a photo url").not().isEmpty().trim().escape(),
  check("payment", "Please enter a payment token").not().isEmpty().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  }
];
