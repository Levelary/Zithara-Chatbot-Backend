import { Router } from "express";
import {
  deleteUserController,
  getUsersController,
  updateUserController,
} from "../controllers/user";
import { isAuthorized } from "../utils/middlewares";

export default (router: Router) => {
  router.get("/users", isAuthorized, getUsersController);
  router.put("/users", updateUserController);
  router.delete("/users", deleteUserController);
};
