import prisma from "../services/prima";
import {NextFunction, Request, Response} from 'express';
import {throws} from "assert";

export async function isIdValid(id: number): Promise<boolean> {
        const result = await prisma.snippet.findFirst({
            where: {
                id: id
            }
        });

        if (result) {
            return true;
        } else {
            throw new Error("Language with ID not found.")
        }
}

export async function isAuthorConnected(req: Request, res:Response, next:NextFunction): Promise<void> {
    const result = await prisma.snippet.findFirst({
        where: {
            id: parseInt(req.params.id)
        }
    });

    if (req.session.user && result && (req.session.user.id === result.authorId)) {
        next()
    } else {
        const err = new Error("Not your snippet !")
        res.render('error', { err, titre : "Erreur" });    }
}