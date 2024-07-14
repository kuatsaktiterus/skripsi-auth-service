import { body } from "express-validator";

const schema = [
  body("username")
    .isString()
    .withMessage("username must be a string")
    .notEmpty()
    .withMessage("username must not be empty"),
  body("password")
    .isString()
    .withMessage("password must be a string")
    .notEmpty()
    .withMessage("password must not be empty"),
];

export default schema;
