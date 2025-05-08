import express from "express";
const userRouter = express.Router();
import {registerUser,loginUser,currentUser} from '../controllers/userController.js';
import {protect} from '../middleware/authMiddleware.js';

userRouter.post('/',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/current',protect,currentUser);

export default userRouter;