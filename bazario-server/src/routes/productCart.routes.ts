import { Response, Request, NextFunction, Router } from "express";
import { addProductToCart, getAllProductCart, deleteProductFromCart } from "../controllers/productCart.controller";
import { authorizeJwt } from "../middleware/auth";

const router = Router();

router.post("/", authorizeJwt, (req: Request, res: Response, next: NextFunction) => {
     addProductToCart(req, res, next);
});

router.get("/:id", authorizeJwt, (req: Request, res: Response, next: NextFunction) => {
     getAllProductCart(req, res, next);
});

router.delete("/delete/:id", authorizeJwt, (req: Request, res: Response) => {
     deleteProductFromCart(req, res);
});

export default router;
