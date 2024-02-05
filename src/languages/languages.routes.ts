import express from 'express';
import { LanguageController } from './languages.controller';
import expressAsyncHandler from 'express-async-handler';


export const languageRouter = express.Router();

languageRouter.get('/',
    expressAsyncHandler(LanguageController.list)
);
export default languageRouter;