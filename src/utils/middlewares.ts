import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
export function isAuthorized(req: Request, res: Response, next: NextFunction) {
  const authHeaders = req.headers["authorization"];
  //   console.log(req.headers);
  const token = authHeaders?.split(" ")[1];
  console.log(req.headers, token);
  if (token) {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err: any, user: any) => {
        if (err || !user) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        // req.user = user;
        return next();
      }
    );
    return;
  }

  res.status(401).send("User not authorized");
}

export const deepSeekMessage = async (prompt: string) => {
  try {
    const response: any = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "*",
        },
      }
    );

    // You can return or process the response here
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error while calling DeepSeek API:", error);
    throw error;
  }
};
