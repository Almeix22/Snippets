import { Request, Response, NextFunction } from "express";
import prisma from "../services/prima";
import bcrypt from "bcrypt";


export class AuthController {
  static async loginForm(req: Request, res: Response, next: NextFunction): Promise<void>{
    res.render('auth/loginForm', {titre: "Formulaire de connexion"})
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<void>{
    const user = await prisma.user.findFirst({
        where: {
          name: req.body.name
        }
      });


      if(user){
        if(!await bcrypt.compare(req.body.password, user.hashedPassword)){
            throw new Error("Mot de passe incorrect")
        } else {
            req.session.regenerate(function(err) {if(err){throw new Error("Boogy man")}})
              req.session.user = user
              res.redirect('/')
        }
      } else {
        throw new Error("Utilisateur non trouvé")
      }

}
    static async logout(req: Request, res: Response, next: NextFunction): Promise<void>{
        req.session.destroy(function(err) {if(err){throw new Error("Boogy man")}})
        res.redirect('/')
    }
}