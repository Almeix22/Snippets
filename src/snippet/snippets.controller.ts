import { Request, Response, NextFunction } from "express";
import prisma from "../services/prima"; // Assurez-vous d'importer correctement votre instance de Prisma
import { validationResult } from "express-validator";

export class SnippetsController {
  static async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = validationResult(req)
      const lang = req.params.lang
      if (result.isEmpty()) {
        const langId =req.params.lang ? Number(lang) : 0
        // Récupérer la liste de tous les snippets
        let snippets = [];
        if (langId != 0) {
          snippets = await prisma.snippet.findMany({
            include: {
              Language: true,
              author: true
            },
            where: {
              languageId: langId
            }
          });

        } else {
          snippets = await prisma.snippet.findMany({
            include: {
              Language: true,
              author: true
            },
          });
        }

        res.render('snippets/snippets_list', {snippets: snippets, titre: "Liste des snippets", user: req.session.user?.name});

      } else {
        throw new Error("Language Not Found.")
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des snippets :", error);
      next(error);
    }
  }

  static newForm(req: Request, res: Response, next: NextFunction): void {
    console.log("test")
    res.render('snippets/snippet_form', {snippet : false , titre: "Création d'un snippet"});
  }

  static async newSnippet(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.body) {
      await prisma.snippet.create({
        data: {
          title: req.body.title,
          languageId: parseInt(req.body.lang),
          code: req.body.code,
          description: req.body.description,
          creationDate: new Date()
        }
      });
      res.redirect('/')
    } else {
      throw new Error("Invalid form data")
    }
  }

  static async editForm(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log(req.params.id)
    const snippet = await prisma.snippet.findFirst({
      where: {
        id: parseInt(req.params.id)
      }
    });
    if(snippet){
      res.render('snippets/snippet_form', {snippet: snippet, titre: "Liste des snippets"});
    }
}

  static async editSnippet(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.body) {
      await prisma.snippet.update({
        where: {
          id: parseInt(req.params.id)
        },
        data: {
          title: req.body.title,
          languageId: parseInt(req.body.lang),
          code: req.body.code,
          description: req.body.description,
          creationDate: new Date()
        }
      });
      res.redirect('/')
    } else {
      throw new Error("Invalid form data")
    }
  }

  static async deleteSnippet(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.params) {
      await prisma.snippet.delete({
        where: {
          id: parseInt(req.params.id)
        }
      });
      res.redirect('/')
    } else {
      throw new Error("Snippet delete error")
    }
  }
}