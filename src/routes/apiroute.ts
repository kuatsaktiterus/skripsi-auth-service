import Router from "express";
import auth from "../controller/AuthController/AuthController";
import { validateRequestSchema } from "../middleware/validate-request";
import loginValidationSchema from "../schema/login-validation-schema";

let ROUTER = Router();

ROUTER.post(
  "/login/",
  loginValidationSchema,
  validateRequestSchema,
  auth.login
);
ROUTER.get("/", (req, res) => {
  res.send("Hello World");
});

export default ROUTER;
