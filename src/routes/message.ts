import { Router } from "express";

import {
  getMessagesByChatIdController,
  addMessageController,
} from "../controllers/message";

import { isAuthorized } from "../utils/middlewares";

export default (router: Router) => {
  router.get("/messages/:chat_id", isAuthorized, getMessagesByChatIdController);
  router.post("/messages", isAuthorized, addMessageController);
};
