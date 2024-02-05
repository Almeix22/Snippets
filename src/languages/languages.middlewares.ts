import prisma from "../services/prima";

export async function languageValidator(languageId: number): Promise<boolean> {    
        const result = await prisma.language.findFirst({
            where: {
                id: languageId
            }
        });

        if (result) {
            return true;
        } else {
            throw new Error("Language with ID not found.")
        }
}