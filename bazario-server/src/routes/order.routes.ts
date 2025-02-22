import { Router, Request, Response, NextFunction } from "express";
import { placeOrder, getOrders, getOrderById, cancelOrder } from "../controllers/order.controller";
import { authorizeJwt } from "../middleware/auth";

const router = Router();

router.post("/placeOrder", authorizeJwt, (req: Request, res: Response) => {
     placeOrder(req, res);
});

router.get("/getOrders", authorizeJwt, (req: Request, res: Response) => {
     getOrders(req, res);
});

router.get("/getOrderById/:id/:productId", authorizeJwt, (req: Request, res: Response) => {
     getOrderById(req, res);
});

router.patch("/cancelOrder/:id", authorizeJwt, (req: Request, res: Response) => {
     cancelOrder(req, res);
});

export default router;