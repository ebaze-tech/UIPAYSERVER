const { body, validationResult } = require("express-validator");

const replacementValidation = [
  body("number").isInt().withMessage("User number must be an integer"),
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
  body("number").isInt().withMessage("User number must be an integer"),
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
  replacementValidation,
  upgradeValidation,
};
