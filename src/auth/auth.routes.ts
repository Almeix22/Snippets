import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { AuthController } from './auth.controller';
import bodyParser from 'body-parser';


export const authRouter = express.Router();

authRouter.get('/',
    expressAsyncHandler(AuthController.loginForm)
);

authRouter.get('/logout',
    expressAsyncHandler(AuthController.logout)
);

authRouter.post('/login',
    bodyParser.urlencoded({ extended: false }),
    expressAsyncHandler(AuthController.login)
);
export default authRouter;