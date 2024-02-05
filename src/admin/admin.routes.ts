import express from 'express';
import { AdminController } from './admin.controller';
import expressAsyncHandler from 'express-async-handler';
import {isAdmin, isConnected} from "../auth/auth.middleware";
import {body, param} from "express-validator";
import {SnippetsController} from "../snippet/snippets.controller";
import {languageValidator} from "../languages/languages.middlewares";
import snippetRouter from "../snippet/snippets.routes";


export const adminRouter = express.Router();


adminRouter.get('/',
    AdminController.index
);

adminRouter.get('/users',
    expressAsyncHandler(AdminController.users)
);

adminRouter.get('/edit/:id',
    isConnected,
    isAdmin,
    expressAsyncHandler(AdminController.editForm)
);

adminRouter.post('/edit/:id',
    isConnected,
    express.urlencoded({ extended: true }),
    isAdmin,
    body("name").isLength({min: 5, max: 50}),
    expressAsyncHandler(AdminController.editUser)
);
adminRouter.get('/delete/:id',
    isConnected,
    isAdmin,
    expressAsyncHandler(AdminController.deleteUser)
);

adminRouter.get('/new',
    isConnected,
    AdminController.newForm
);
adminRouter.post('/new',
    isConnected,
    express.urlencoded({ extended: true }),
    expressAsyncHandler(AdminController.newUser)
);

export default adminRouter;