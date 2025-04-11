import { PoolConnection } from "mysql2/promise";

export async function createNewChat(
  connection: PoolConnection,
  user_id: number,
  chat_name: string | null
) {
  try {
    const query = `INSERT INTO chats (user_id, chat_name) VALUES (?, ?)`;
    const [rows] = await connection.query(query, [
      user_id,
      chat_name ? chat_name : "New Chat",
    ]);

    const chatId = (rows as any).insertId; // Assuming the result contains the insertId
    console.log("Chat created successfully:", chatId);
    return chatId;
  } catch (error: any) {
    console.log(`Error Occurred in createNewChat: ${error.message}`);
    throw error;
  }
}

export async function getChats(
  connection: PoolConnection,
  user_id: number,
  chat_id: number | null,
  search_term: string | null
) {
  try {
    const chat_id_query = chat_id ? `AND chat_id=${chat_id}` : "";
    const chat_name_query = search_term
      ? `AND chat_name LIKE '%${search_term}%'`
      : "";
    const query = `SELECT * FROM chats WHERE user_id=? ${chat_id_query} ${chat_name_query};`;

    console.log(user_id);
    const [rows] = await connection.query(query, [user_id]);
    return rows;
  } catch (error: any) {
    console.log(`Error Occurred in getChats: ${error.message}`);
    throw error;
  }
}

export async function updateChatName(
  connection: PoolConnection,
  chat_id: number,
  chat_name: string
) {
  try {
    const query = `UPDATE chats SET chat_name = ? WHERE chat_id = ?`;
    await connection.query(query, [chat_name, chat_id]);
    return true;
  } catch (error: any) {
    console.log(`Error Occurred in updateChatName: ${error.message}`);
    throw error;
  }
}
