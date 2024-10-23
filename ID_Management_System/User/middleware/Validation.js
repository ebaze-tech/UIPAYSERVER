const { body, validationResult } = require("express-validator");

const applicationValidation = [
  body("number").isString().withMessage("User number must be a string"),
  // body("reason").isString().withMessage("Reason must be a string"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const replacementValidation = [
  body("number").isString().withMessage("User number must be a string"),
  // body("reason").isString().withMessage("Reason must be a string"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const upgradeValidation = [
  body("number").isString().withMessage("User number must be a string"),
  // body("newDetails").isObject().withMessage("New details must be an object"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  applicationValidation,
  replacementValidation,
  upgradeValidation,
};
