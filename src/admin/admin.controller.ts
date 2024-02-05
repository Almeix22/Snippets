import { Request, Response, NextFunction } from "express";
import prisma from "../services/prima";
import bcrypt from 'bcrypt'
import {Role} from "@prisma/client";


export class AdminController {
  static index(req: Request, res: Response, next: NextFunction): void {
    res.render('admin/admin', {titre: "Page administrateur"})
  }

  static async users(req: Request, res: Response, next: NextFunction): Promise<void> {
    const users = await prisma.user.findMany();
    res.render('admin/users', {users : users, titre: "Liste des users"})
  }

  static async editForm(req: Request, res: Response, next: NextFunction): Promise<void> {
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(req.params.id)
      }
    });
    if(user){
      res.render('admin/user_form', {user: user, titre: "Création d'utilisateur"});
    }
  }

  static async editUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log(req.body)
    if (req.body) {
      await prisma.user.update({
        where: {
          id: parseInt(req.params.id)
        },
        data: {
          name: req.body.Name,
          role: parseInt(req.body.role) === 2 ? Role.ADMIN : Role.USER,
          hashedPassword: await bcrypt.hash("azerty",10),
        }
      });
      res.redirect('/admin/users')
    } else {
      throw new Error("Invalid form data")
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.params) {
      await prisma.snippet.deleteMany({
        where: {
          authorId: parseInt(req.params.id)
        }
      });
      await prisma.user.delete({
        where: {
          id: parseInt(req.params.id)
        }
      });
      res.redirect('/admin/users')
    } else {
      throw new Error("User delete error")
    }
  }

  static newForm(req: Request, res: Response, next: NextFunction): void {
    res.render('admin/user_form', {user : false , titre: "Création d'un utilisateur"});
  }

  static async newUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.body) {
      await prisma.user.create({
        data: {
          name: req.body.Name,
          role: parseInt(req.body.role) === 2 ? Role.ADMIN : Role.USER,
          hashedPassword: await bcrypt.hash("azerty",10),
        }
      });
      res.redirect('/admin/users')
    } else {
      throw new Error("Invalid form data")
    }
  }
}