import { Router, Request, Response, NextFunction } from "express";
import { addReview, getAllReviews } from "../controllers/review.controller";
import { authorizeJwt } from "../middleware/auth";
import { upload } from '../middleware/imageUpload'

const router = Router();

router.post("/", authorizeJwt, upload.array("images", 5), async (req: Request, res: Response, next: NextFunction) => {
    await addReview(req, res, next);
});

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    await getAllReviews(req, res, next);
});

export default router;