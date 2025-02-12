import { Response, Request, NextFunction, Router } from "express";
import { addProductToCart, getAllProductCart, deleteProductFromCart } from "../controllers/productCart.controller";

const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
     addProductToCart(req, res, next);
});

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
     getAllProductCart(req, res, next);
});

router.delete("/delete/:id", (req: Request, res: Response) => {
     deleteProductFromCart(req, res);
});

export default router;
