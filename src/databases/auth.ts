import { PoolConnection } from "mysql2/promise";
import bcrypt from "bcryptjs";
export async function signup(
  connection: PoolConnection,
  email: string,
  password: string,
  username: string
) {
  try {
    const [user]: any[] = await connection.query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    if (user.length > 0) {
      return {
        message: "User already registered",
        status: 400,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (email, password, username ,created_time) VALUES (?, ?, ?, NOW())`;
    const [rows] = await connection.query(query, [
      email,
      hashedPassword,
      username,
    ]);
    console.log(user);

    return {
      status: 200,
      rows,
    };
  } catch (error: any) {
    console.log(`Error at signup: ${error.message}`);
    throw error;
  }
}

export async function login(
  connection: PoolConnection,
  email: string,
  password: string
) {
  try {
    const query = `SELECT * FROM users WHERE email LIKE ?`;
    const [rows]: any[] = await connection.execute(query, [email]);
    if (rows.length === 0) {
      throw new Error("User not found");
    }
    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Password is incorrect");
    }
    return user;
  } catch (error: any) {
    console.log(`Error at login: ${error.message}`);
    throw error;
  }
}
