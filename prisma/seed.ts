import {PrismaClient, Role} from '@prisma/client';
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();
    
async function main() {


    const user1 = await prisma.user.create({
        data: {
            name: "fran0138",
            hashedPassword: await bcrypt.hash("azerty", 10),
            role: Role.ADMIN
        }
    });

    const user2 = await prisma.user.create({
        data: {
            name: "jonu0002",
            hashedPassword: await bcrypt.hash("azerty", 10)
        }
    });

    const langC = await prisma.language.create({
        data: {
            name: "C",
            htmlClass: 'language-c',
            logo: "devicon-c-plain",
        }
    });
    const langHTML = await prisma.language.create({
        data: {
            name: "HTML",
            htmlClass: 'language-html',
            logo: "devicon-html5-plain",
        }
    });

    await prisma.snippet.create({
        data: {
            title: 'Hello World',
            code:
`main()
{
    printf("hello, world\\n");
}`,
            description: 'Code original publié dans "The C Programming Language" de Brian Kernighan et Dennis Ritchie.',
            creationDate: new Date(2023, 4, 8, 9, 12, 36),
            Language : {
                connect : {name : langC.name}
            },
            author : {
                connect :  {name : user1.name}
            }
        }
    });

    await prisma.snippet.create({
        data: {
            title: 'Il faut protéger ses chaînes de caractères',
            code: '<script>window.alert("Injection !")</script>',
            creationDate: new Date(2023, 3, 4, 5, 6, 7),
            description: 'Dans le template EJS, observez le comportement de la page en utilisant successivement les balises <%- et <%=pour injecter les données.', 
            Language : {
                connect : {name : langHTML.name}
            },
            author : {
                connect :  {name : user1.name}
            }
        }
    });

    await prisma.snippet.create({
        data: {
            title: "Snippet illustrant l'utilisation de l'attribut HTML download",
            code: '<a href="./public/images/user.svg" download>',
            creationDate: new Date(2023, 3, 4, 5, 6, 7),
            description: 'Yeeehaaaaaa.', 
            Language : {
                connect : {name : langHTML.name}
            },
            author : {
                connect :  {name : user2.name}
            }
        }
    });

}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});