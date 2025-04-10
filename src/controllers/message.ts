import { Request, Response } from "express";
import { db } from "../utils/dbconfig";
import { addMessage, getMessagesByChatId } from "../databases/message";

export async function getMessagesByChatIdController(
  req: Request,
  res: Response
): Promise<any> {
  const connection = await db.promise().getConnection();
  try {
    const { chat_id } = req.params;
    await connection.beginTransaction();
    const response = await getMessagesByChatId(connection, parseInt(chat_id));
    await connection.commit();
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error: any) {
    await connection.rollback();
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  } finally {
    connection.release();
  }
}

export async function addMessageController(
  req: Request,
  res: Response
): Promise<any> {
  const connection = await db.promise().getConnection();
  try {
    const { chat_id, user_id, message, time } = req.body;
    await connection.beginTransaction();

    const response = await addMessage(
      connection,
      chat_id,
      user_id,
      message,
      time
    );
    await connection.commit();
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error: any) {
    await connection.rollback();
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  } finally {
    connection.release();
  }
}
