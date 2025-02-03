import mongoose from "mongoose";
import Product from "../models/product.model";
import { NextFunction, Request, Response } from "express";
import moment from "moment";


export const addProduct = async (
     res: Response,
     req: Request,
     next: NextFunction
) => {
     try {

     } catch (error: any){
          res.status(400)
     }
}