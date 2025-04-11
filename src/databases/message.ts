import { PoolConnection } from "mysql2/promise";
import dotenv from "dotenv";
import { deepSeekMessage } from "../utils/middlewares";

dotenv.config();

export async function getMessagesByChatId(
  connection: PoolConnection,
  chatId: number
) {
  try {
    const [rows] = await connection.query(
      `SELECT * FROM messages WHERE chat_id = ?
        ORDER BY sent_time ASC
      `,
      [chatId]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
}

async function addBotReply(
  connection: PoolConnection,
  chat_id: number,
  prompt: string,
  time: string
) {
  try {
    const message = await deepSeekMessage(prompt);
    await connection.query(
      `INSERT INTO messages (chat_id, message, user_id, sent_time) VALUES (?, ?, 1, ?)`,
      [chat_id, message, time]
    );
    return message;
  } catch (error) {
    console.error("Error adding bot reply:", error);
    throw error;
  }
}

export async function addMessage(
  connection: PoolConnection,
  chat_id: number,
  user_id: number,
  message: string,
  time: string
) {
  try {
    await connection.query(
      `INSERT INTO messages (chat_id, user_id, message, sent_time) VALUES (?, ?, ?, ?)`,
      [chat_id, user_id, message, time]
    );

    const msg = await addBotReply(connection, chat_id, message, time);

    return msg;
  } catch (error) {
    console.error("Error adding message:", error);
    throw error;
  }
}
