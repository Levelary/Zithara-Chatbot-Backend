import { Request, Response } from "express";
import { db } from "../utils/dbconfig";
import { createNewChat, getChats, updateChatName } from "../databases/chat";

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

    const data = {
      chat_id: response,
      user_id: user_id,
      chat_name: req.body.chat_name || "New Chat",
    };
    res.status(200).json({ message: "Chat created successfully", data });
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
    const { user_id, chat_id, search_term } = req.query;
    console.log("Request query:", req.query); // Log the request body for debugging
    await connection.beginTransaction();
    const response = await getChats(
      connection,
      parseInt(user_id as string),
      chat_id ? parseInt(chat_id as string) : null,
      search_term ? (search_term as string) : null
    );
    await connection.commit();
    res
      .status(200)
      .json({ message: "Chats fetched successfully", data: response });
  } catch (error: any) {
    console.log("Error occurred in getChatsController:", error.message);
    await connection.rollback();
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  } finally {
    connection.release();
  }
};

export const updateChatNameController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const connection = await db.promise().getConnection();
  try {
    const { chat_name } = req.body;
    const { chat_id } = req.params;
    await connection.beginTransaction();
    await updateChatName(connection, parseInt(chat_id), chat_name as string);
    await connection.commit();
    res.status(200).json({ message: "Chat name updated successfully" });
  } catch (error: any) {
    console.log("Error occurred in updateChatNameController:", error.message);
    await connection.rollback();
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  } finally {
    connection.release();
  }
};
