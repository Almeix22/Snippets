import express from 'express';
import session from 'express-session';

const app = express();

app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.session_secret!, // ajoutez la variable d'environnement correspondante au fichier .env
    saveUninitialized: false,
    resave: false
}));

declare module "express-session" {
    interface SessionData {
    }
}
