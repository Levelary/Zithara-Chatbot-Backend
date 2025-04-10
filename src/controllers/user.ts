import { Request, Response } from "express";
import { db } from "../utils/dbconfig";
import { deleteUser, getUsers, updateUser } from "../databases/user";

export const getUsersController = async (req: Request, res: Response) => {
  const connection = await db.promise().getConnection();
  try {
    const { id } = req.query;
    const response = await getUsers(connection, id);
    res.status(200).json(response);
  } catch (error: any) {
    console.log(`Error Occurred in getUsersController: ${error.message}`);
    res.status(500).json({ message: error.message });
  } finally {
    connection.release();
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  const connection = await db.promise().getConnection();
  try {
    const { id, name, email } = req.body;
    const response = await updateUser(connection, id, name, email);
    res.status(200).json(response);
  } catch (error: any) {
    console.log(`Error Occurred in updateUserController: ${error.message}`);
    res.status(500).json({ message: error.message });
  } finally {
    connection.release();
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  const connection = await db.promise().getConnection();
  try {
    const { id } = req.query;
    const response = await deleteUser(connection, id);
    res.status(200).json(response);
  } catch (error: any) {
    console.log(`Error Occurred in deleteUserController: ${error.message}`);
    res.status(500).json({ message: error.message });
  } finally {
    connection.release();
  }
};
