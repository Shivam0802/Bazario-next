import { Router, Request, Response, NextFunction } from 'express';
import { subscribeToNewsletter } from '../controllers/newsletter.controller';

const router = Router();

router.post('/subscribe', (req: Request, res: Response) => {
     subscribeToNewsletter(req, res);
});

export default router;