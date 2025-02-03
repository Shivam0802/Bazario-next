import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import dotenv from "dotenv";

dotenv.config();

export const authorizeJwt: RequestHandler = async (req, res, next) => {
  const authorization = req.headers["authorization"];
  let token = authorization && authorization.split("Bearer ")[1];
  if (!token && typeof req.query.token === "string") {
    token = req.query.token;
  }

  if (!token) {
    console.log("No token provided");
    res.status(401).json({ message: "Invalid Token" });
    return;
  }

  try {
    console.log("Token:", token);
    const decoded: any = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET as string);
    const user = decoded;
    next();
  } catch (e) {
    console.error("Token verification error:", e);
    res.status(401).json({ message: "Token is not valid" });
    return;
  }
};