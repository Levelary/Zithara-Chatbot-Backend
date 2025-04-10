import { PoolConnection } from "mysql2/promise";

export async function createNewChat(
  connection: PoolConnection,
  user_id: number,
  chat_id: number,
  chat_name: string | null
) {
  try {
    const query = `INSERT INTO chats (user_id, chat_id, chat_name) VALUES (?, ?, ?)`;
    const [rows] = await connection.query(query, [
      user_id,
      chat_id,
      chat_name ? chat_name : "New Chat",
    ]);
    return rows;
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
    const [rows] = await connection.query(query, [user_id]);
    return rows;
  } catch (error: any) {
    console.log(`Error Occurred in getChats: ${error.message}`);
    throw error;
  }
}
