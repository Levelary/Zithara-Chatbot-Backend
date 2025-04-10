import { PoolConnection } from "mysql2/promise";

export async function getUsers(
  connection: PoolConnection,

  id: any
) {
  try {
    const id_query = id ? `WHERE id=${id}` : "";

    const query = `SELECT * FROM users ${id_query};`;
    const [rows] = await connection.query(query, [id]);
    return rows;
  } catch (error: any) {
    console.log(`Error Occurred in getUsers: ${error.message}`);
    throw error;
  }
}

export async function updateUser(
  connection: PoolConnection,
  id: any,
  name: any,
  email: any
) {
  try {
    const query = `UPDATE users SET name=?, email=? WHERE id=?`;
    const [rows] = await connection.query(query, [name, email, id]);
    return rows;
  } catch (error: any) {
    console.log(`Error Occurred in updateUser: ${error.message}`);
    throw error;
  }
}

export async function deleteUser(connection: PoolConnection, id: any) {
  try {
    const query = `DELETE FROM users WHERE id=?`;
    const [rows] = await connection.query(query, [id]);
    return rows;
  } catch (error: any) {
    console.log(`Error Occurred in deleteUser: ${error.message}`);
    throw error;
  }
}
