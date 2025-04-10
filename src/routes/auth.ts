import { Router } from "express";
import { loginController, signupController } from "../controllers/auth";

export default (router: Router) => {
  router.post("/auth/signup", signupController);
  router.post("/auth/login", loginController);
};
