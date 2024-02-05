import express from 'express';
import { SnippetsController } from './snippets.controller';
import expressAsyncHandler from 'express-async-handler';
import { languageValidator } from '../languages/languages.middlewares';
import {body, param} from 'express-validator';
import {isConnected} from "../auth/auth.middleware";
import {isAuthorConnected, isIdValid} from "./snippets.middlewares";


export const snippetRouter = express.Router();

snippetRouter.get('/new',
    isConnected,
    SnippetsController.newForm
);
snippetRouter.post('/new',
    isConnected,
    express.urlencoded({ extended: true }),
    body("title").isLength({min: 5, max: 50}),
    body("lang").custom(languageValidator),
    body("code").isLength({min: 1, max: 1000}),
    body("description").isLength({min: 0, max: 1000}),
    expressAsyncHandler(SnippetsController.newSnippet)
);

snippetRouter.get('/edit/:id',
    isConnected,
    isAuthorConnected,
    expressAsyncHandler(SnippetsController.editForm)
);

snippetRouter.post('/edit/:id',
    isConnected,
    express.urlencoded({ extended: true }),
    param('id').custom(isIdValid),
    isAuthorConnected,
    body("title").isLength({min: 5, max: 50}),
    body("lang").custom(languageValidator),
    body("code").isLength({min: 1, max: 1000}),
    body("description").isLength({min: 0, max: 1000}),
    expressAsyncHandler(SnippetsController.editSnippet)
);
snippetRouter.get('/delete/:id',
    isConnected,
    param('id').custom(isIdValid),
    isAuthorConnected,
    expressAsyncHandler(SnippetsController.deleteSnippet)
);


snippetRouter.get('/:lang(\\d+)?',
    param("lang").custom(languageValidator),
    expressAsyncHandler(SnippetsController.list)
);

export default snippetRouter;