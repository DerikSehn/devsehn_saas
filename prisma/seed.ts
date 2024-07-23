//seed.ts
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany();
  if (projects.length === 0) {
    await prisma.project.createMany({
      data: [
        {
          title: "Projeto 1",
          description: "Descrição do projeto 1",
        },
        {
          title: "Projeto 2",
          description: "Descrição do projeto 2",
        },
        {
          title: "Projeto 3",
          description: "Descrição do projeto 3",
        },
      ],
    });
  }
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    await prisma.user.createMany({
      data: [
        {
          name: "João",
          email: "joao@culturaverde.com.br",
          password: await hash("joao" + "test", 12),
          emailVerified: new Date(),
        },
        {
          name: "Maria",
          email: "maria@culturaverde.com.br",
          password: await hash("maria" + "test", 12),
          emailVerified: new Date(),
        },
      ],
    });
  }
  const comments = await prisma.comment.findMany();
  if (comments.length === 0) {
    try {
      prisma.comment.createMany({
        skipDuplicates: true,
        data: [
          {
            model: "User",
            field: "name",
            description: "Nome",
          },
          {
            model: "User",
            field: "email",
            description: "Email",
          },
          {
            model: "User",
            field: "password",
            description: "Senha",
          },
          {
            model: "User",
            field: "emailVerified",
            description: "Data de verificação do email",
          },
          {
            model: "Project",
            field: "title",
            description: "Título do projeto",
          },
          {
            model: "Project",
            field: "description",
            description: "Descrição do projeto",
          },
          {
            model: "Image",
            field: "name",
            description: "Nome da imagem",
          },
          {
            model: "Image",
            field: "description",
            description: "Descrição da imagem",
          },
          {
            model: "Testimonial",
            field: "name",
            description: "Nome do cliente",
          },
          {
            model: "Testimonial",
            field: "description",
            description: "Depoimento do cliente",
          },
          {
            model: "Testimonial",
            field: "job",
            description: "Cargo do cliente",
          },
          {
            model: "Testimonial",
            field: "id",
            description: "Imagem do cliente",
          },
          {
            model: "EmailTemplate",
            field: "keyword",
            description: "Palavra-chave do email",
          },
          {
            model: "EmailTemplate",
            field: "headerTitle",
            description: "Título do email",
          },
          {
            model: "EmailTemplate",
            field: "headerSubtitle",
            description: "Subtítulo do email",
          },
          {
            model: "EmailTemplate",
            field: "buttonText",
            description: "Texto do botão",
          },
          {
            model: "EmailTemplate",
            field: "buttonLink",
            description: "Link do botão",
          },
          {
            model: "EmailTemplate",
            field: "footerText",
            description: "Texto do rodapé",
          },
          {
            model: "EmailContent",
            field: "heading",
            description: "Título do conteúdo",
          },
          {
            model: "EmailContent",
            field: "paragraph",
            description: "Parágrafo do conteúdo",
          },
          {
            model: "EmailLink",
            field: "description",
            description: "Descrição do link",
          },
          {
            model: "EmailLink",
            field: "href",
            description: "Link do link",
          },
          {
            model: "EmailLink",
            field: "emailTemplateId",
            description: "Id do template do email",
          },
          {
            model: "Service",
            field: "title",
            description: "Título do serviço",
          },
          {
            model: "Service",
            field: "description",
            description: "Descrição do serviço",
          },
          {
            model: "Service",
            field: "imageId",
            description: "Imagem do serviço",
          },
          {
            model: "Project",
            field: "title",
            description: "Título do projeto",
          },
          {
            model: "Project",
            field: "description",
            description: "Descrição do projeto",
          },
          {
            model: "Project",
            field: "images",
            description: "Imagens do projeto",
          },
          {
            model: "Section",
            field: "title",
            description: "Título da seção",
          },
          {
            model: "Section",
            field: "description",
            description: "Descrição da seção",
          },
          {
            model: "Section",
            field: "images",
            description: "Imagens da seção",
          },
        ],
      });
      const sections = await prisma.section.findMany();
      if (sections.length === 0) {
        await prisma.section.createMany({
          data: [
            {
              title: "Seção 1",
              description: "Descrição da seção 1",
            },
            {
              title: "Seção 2",
              description: "Descrição da seção 2",
            },
            {
              title: "Seção 3",
              description: "Descrição da seção 3",
            },
          ],
        });
      }
    } catch (e) {}
  }
}

/* run  with prisma db seed */

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
