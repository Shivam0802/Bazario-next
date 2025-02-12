import { Router, Request, Response, NextFunction } from 'express';
import { createUser, getUsersByID, loginUser, updateUserById, deleteUser, forgetPassword, resetPassword } from '../controllers/user.controller';
import { authorizeJwt } from '../middleware/auth';

const router = Router();

router.post('/addUser', (req: Request, res: Response) => {
  createUser(req, res);
});

router.get('/getUserById/:id', authorizeJwt, (req: Request, res: Response) => {
  getUsersByID(req, res);
});

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  loginUser(req, res, next);
});

router.patch('/updateUser/:id',authorizeJwt, (req: Request, res: Response) => {
  updateUserById(req,res);
});

// router.patch('/deactivate/:id', authorizeJwt, (res: Response, req: Request) => {
//   deactivateAccount(req, res)
// });

router.delete('/deleteUser/:id', authorizeJwt, (req:Request, res: Response) => {
  deleteUser(req, res);
})

router.post('/forgetPassword', (req: Request, res: Response) => {
  forgetPassword(req, res);
});

router.post('/resetPassword', (req: Request, res: Response) => {
  resetPassword(req, res);
});

export default router;
