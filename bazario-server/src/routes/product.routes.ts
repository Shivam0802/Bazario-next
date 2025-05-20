import { Router, Request, Response, NextFunction } from "express";
//import multer from "multer";
//import { GridFsStorage } from "multer-gridfs-storage"; // Import the correct GridFsStorage package
//import mongoose from "mongoose";
//import Dbconnection from "../db/dbconfig"; // Assuming this is your DB connection function
import { addProduct, getAllProduct, getProduct, getProductById, updateProduct, deleteProduct } from "../controllers/product.controller";
import { authorizeJwt } from "../middleware/auth";
import { upload } from '../middleware/imageUpload'

const router = Router();


router.post( "/addProduct", authorizeJwt, upload.array("images", 5), (req: Request, res: Response, next: NextFunction) => {
    addProduct(req, res, next)
  }
);

router.get("/", authorizeJwt, (req: Request, res: Response, next: NextFunction) => {
  getProduct(req,res,next);
});

router.get("/getAllProduct", (req: Request, res: Response, next: NextFunction) => {
  getAllProduct(req, res, next);
})

router.get("/getProductById/:id", (req: Request, res: Response, next: NextFunction) => {
  getProductById(req, res, next); 
})

router.patch("/updateProduct/:id", authorizeJwt, upload.array("images", 5), (req: Request, res: Response, next: NextFunction) => {
  updateProduct(req, res, next);
})

router.delete("/deleteProduct/:id", authorizeJwt, (req: Request, res: Response, next: NextFunction) => {
  deleteProduct(req, res, next);
})

export default router;
