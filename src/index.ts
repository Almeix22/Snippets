import express from 'express';
import session from 'express-session';
import snippetRouter from './snippet/snippets.routes';
import process from 'process';
import 'dotenv/config'
import { Response, Request, NextFunction } from 'express';
import languageRouter from './languages/languages.routes';
import authRouter from './auth/auth.routes';
import {isAdmin, sessionUser} from './auth/auth.middleware';
import adminRouter from "./admin/admin.routes";

const app = express();

app.use(session({
    secret: process.env.session_secret!, // ajoutez la variable d'environnement correspondante au fichier .env
    saveUninitialized: false,
    resave: false
}), sessionUser);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(sessionUser);

app.use('/', snippetRouter);
app.use('/languages', languageRouter);
app.use('/auth', authRouter);
app.use('/admin',
    isAdmin,
    adminRouter
);
app.use((err: Error, req: Request, res: Response, next : NextFunction) => {
    console.log(`ERREUR : ${err.message}`);
    res.render('error', { err, titre : "Erreur" });
});

const port = process.env.port;

app.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});