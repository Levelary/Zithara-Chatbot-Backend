import { Router } from "express";

import {
  createNewChatController,
  getChatsController,
  updateChatNameController,
} from "../controllers/chat";

import { isAuthorized } from "../utils/middlewares";

export default (router: Router) => {
  router.post("/chat", isAuthorized, createNewChatController);
  router.get("/chat", isAuthorized, getChatsController);
  router.put("/chat/:chat_id", isAuthorized, updateChatNameController);
};
