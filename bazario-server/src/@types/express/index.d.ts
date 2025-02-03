import express from "express";
import { Types } from "mongoose";
import { IUser } from "../../src/models/user.model";

declare global {
  namespace Express {
   interface Request {
      user?: {
        userId: Types.ObjectId | string;
        role: "USER";
        user: {
          name: string;
          email: string;
          contact: string;
          address: string;
          city: string;
          state: string;
          pinCode:string;
          dob:Date;
          gender: string;
          _id: Types.ObjectId | string;
        };
        userObj?: IUser | undefined | null;
      };
    }
  }
}
