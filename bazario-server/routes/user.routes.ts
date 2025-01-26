import { Router, Request, Response } from 'express';
import { createUser, getUsersByID } from '../controllers/user.controller';

const router = Router();

router.post('/addUser', (req: Request, res: Response) => {
  createUser(req, res);
});

router.get('/getUser/:id', (req: Request, res: Response) => {
  getUsersByID(req, res);
});

export default router;
