import express from "express";

import user from "./user";
import auth from "./auth";
import chat from "./chat";
import message from "./message";
const router = express.Router();
export default (): express.Router => {
  user(router);
  auth(router);
  chat(router);
  message(router);
  return router;
};
