import { Request, Response } from "express";
import { db } from "../utils/dbconfig";
import { createNewChat, getChats } from "../databases/chat";

export const createNewChatController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const connection = await db.promise().getConnection();
  try {
    const { user_id } = req.body;
    await connection.beginTransaction();
    const response = await createNewChat(
      connection,
      user_id,
      req.body.chat_name || null
    );
    await connection.commit();
    res.status(200).json({ message: "Chat created successfully", response });
  } catch (error: any) {
    console.log("Error occurred in createNewChatController:", error.message);
    await connection.rollback();
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  } finally {
    connection.release();
  }
};

export const getChatsController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const connection = await db.promise().getConnection();
  try {
    const { user_id, chat_id, search_term } = req.body;
    await connection.beginTransaction();
    const response = await getChats(
      connection,
      parseInt(user_id as string),
      chat_id ? parseInt(chat_id as string) : null,
      search_term ? (search_term as string) : null
    );
    await connection.commit();
    res.status(200).json({ message: "Chats fetched successfully", response });
  } catch (error: any) {
    console.log("Error occurred in getChatsController:", error.message);
    await connection.rollback();
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  } finally {
    connection.release();
  }
};
