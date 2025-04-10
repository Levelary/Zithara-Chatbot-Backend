import { Router } from "express";

import {
  createNewChatController,
  getChatsController,
} from "../controllers/chat";

import { isAuthorized } from "../utils/middlewares";

export default (router: Router) => {
  router.post("/chat", isAuthorized, createNewChatController);
  router.get("/chat", isAuthorized, getChatsController);
};
