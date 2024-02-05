import { Request, Response, NextFunction } from "express";
import prisma from "../services/prima"; // Assurez-vous d'importer correctement votre instance de Prisma

export class LanguageController {
  static async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Récupérer la liste de tous les snippets
      let languages = [];
      languages = await prisma.language.findMany({
        include: {
            snippets: true,
          },
        });


      res.render('languages/languages_list', { languages : languages, titre : "Liste des Langages" });

    } catch (error) {
      console.error("Erreur lors de la récupération des snippets :", error);
      next(error);
    }
  }
}