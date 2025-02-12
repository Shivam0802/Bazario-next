import { Router, Request, Response, NextFunction } from "express";
import { contactUs } from "../controllers/contactUs.controller";

const router = Router();

router.post("/", (req: Request, res: Response) => {
     contactUs(req, res);
});

export default router;