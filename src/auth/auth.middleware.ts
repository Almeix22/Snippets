import { Request, Response, NextFunction } from 'express';
                
export function sessionUser(req: Request, res: Response, next: NextFunction): void {
    res.locals.user = req.session.user;
    next();
}
export function isConnected(req: Request, res: Response, next: NextFunction): void {
    if(!res.locals.user){
        res.redirect('/auth')
    }
    next()
}

export function isAdmin(req: Request, res: Response, next: NextFunction): void {
    if(res.locals.user && res.locals.user.role === "ADMIN"){
        next()
    } else {
        const err = new Error("User is not an Admin.")
        res.render('error', { err, titre : "Erreur" });
    }
}