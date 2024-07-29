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

  /* DATA 
    reviews": [
          {
            "name": "places/ChIJRZXfFA2CIpURoVA3wPsuFOY/reviews/ChZDSUhNMG9nS0VJQ0FnSUNXNXYtQ05REAE",
            "relativePublishTimeDescription": "2 anos atrás",
            "rating": 5,
            "text": {
              "text": "Há mais de 3 anos conto com os serviços da cultura verde. O jardim da frente da casa e dos fundos foi projetado e executado pela Josy e Luiz, com pergolado, piscina, churrasqueira, plantas, iluminação, deck, etc. Ficaram show, de revista!",
              "languageCode": "pt"
            },
            "originalText": {
              "text": "Há mais de 3 anos conto com os serviços da cultura verde. O jardim da frente da casa e dos fundos foi projetado e executado pela Josy e Luiz, com pergolado, piscina, churrasqueira, plantas, iluminação, deck, etc. Ficaram show, de revista!",
              "languageCode": "pt"
            },
            "authorAttribution": {
              "displayName": "Valéria Machado Rilho",
              "uri": "https://www.google.com/maps/contrib/110659709492800289603/reviews",
              "photoUri": "https://lh3.googleusercontent.com/a-/ALV-UjVFNL0MiHYGAOG_EhaXLexeOpKDt_PjlV6q0tvP6BJrHbAvzv0o=s128-c0x00000000-cc-rp-mo"
            },
            "publishTime": "2022-02-26T00:18:12Z"
          },
          {
            "name": "places/ChIJRZXfFA2CIpURoVA3wPsuFOY/reviews/ChZDSUhNMG9nS0VJQ0FnSUNXNXBIamN3EAE",
            "relativePublishTimeDescription": "2 anos atrás",
            "rating": 5,
            "text": {
              "text": "O atendimento é excelente! Josy e Luiz são extremamente competentes, queridos e possuem um conhecimento e experiência enorme. A melhor floricultura e prestação de serviços de paisagismo de Capão da Canoa. 💛",
              "languageCode": "pt"
            },
            "originalText": {
              "text": "O atendimento é excelente! Josy e Luiz são extremamente competentes, queridos e possuem um conhecimento e experiência enorme. A melhor floricultura e prestação de serviços de paisagismo de Capão da Canoa. 💛",
              "languageCode": "pt"
            },
            "authorAttribution": {
              "displayName": "Mariana Monteiro",
              "uri": "https://www.google.com/maps/contrib/112378769448325361423/reviews",
              "photoUri": "https://lh3.googleusercontent.com/a-/ALV-UjVbVNOTVlmnIUu8K2FGHOZ5tKbszVimbiE8B2LciIGX6B6pGL3d=s128-c0x00000000-cc-rp-mo"
            },
            "publishTime": "2022-02-25T21:04:49Z"
          },
          {
            "name": "places/ChIJRZXfFA2CIpURoVA3wPsuFOY/reviews/ChZDSUhNMG9nS0VJQ0FnSUNXamVXZFhREAE",
            "relativePublishTimeDescription": "2 anos atrás",
            "rating": 5,
            "text": {
              "text": "Minha experiência com a cultura verde é muito positiva.  cumprem sempre com o que foi projetado e o melhor ainda o jardim é muito bem cuidado o ano inteiro.",
              "languageCode": "pt"
            },
            "originalText": {
              "text": "Minha experiência com a cultura verde é muito positiva.  cumprem sempre com o que foi projetado e o melhor ainda o jardim é muito bem cuidado o ano inteiro.",
              "languageCode": "pt"
            },
            "authorAttribution": {
              "displayName": "Alice Hoffmann",
              "uri": "https://www.google.com/maps/contrib/110793269975513399977/reviews",
              "photoUri": "https://lh3.googleusercontent.com/a/ACg8ocIh24Q2q8WltldY5_5vDeCSwU3t2AQJNTDHkTXrSCxAae9RIw=s128-c0x00000000-cc-rp-mo"
            },
            "publishTime": "2022-03-04T00:35:20Z"
          },
          {
            "name": "places/ChIJRZXfFA2CIpURoVA3wPsuFOY/reviews/ChZDSUhNMG9nS0VJQ0FnSUNXNXVyS0pnEAE",
            "relativePublishTimeDescription": "2 anos atrás",
            "rating": 5,
            "text": {
              "text": "Ótima empresa, já  fiz 3 paisagismo com eles e não abro mão!\nSuper recomendo.",
              "languageCode": "pt"
            },
            "originalText": {
              "text": "Ótima empresa, já  fiz 3 paisagismo com eles e não abro mão!\nSuper recomendo.",
              "languageCode": "pt"
            },
            "authorAttribution": {
              "displayName": "Juares Steinmetz",
              "uri": "https://www.google.com/maps/contrib/102967944892212993729/reviews",
              "photoUri": "https://lh3.googleusercontent.com/a/ACg8ocJjgVrnRXN6Kis8-QHQkp4uoxonVloMKKn5d4buDAYjyqMhpQ=s128-c0x00000000-cc-rp-mo"
            },
            "publishTime": "2022-02-25T20:00:30Z"
          },
          {
            "name": "places/ChIJRZXfFA2CIpURoVA3wPsuFOY/reviews/ChdDSUhNMG9nS0VJQ0FnSUNXNXVhMDJ3RRAB",
            "relativePublishTimeDescription": "2 anos atrás",
            "rating": 5,
            "text": {
              "text": "Atendimento incrível somado o conhecimento profundo trouxeram resultados muito acima da expectativa. Parabéns!!!!",
              "languageCode": "pt"
            },
            "originalText": {
              "text": "Atendimento incrível somado o conhecimento profundo trouxeram resultados muito acima da expectativa. Parabéns!!!!",
              "languageCode": "pt"
            },
            "authorAttribution": {
              "displayName": "Mirassul Pereira",
              "uri": "https://www.google.com/maps/contrib/115153058739685295636/reviews",
              "photoUri": "https://lh3.googleusercontent.com/a-/ALV-UjWqrLxJhbPVeY2EAWpsQ2jOumWRUxC490fKN6U1XpoJhs7XzM0o=s128-c0x00000000-cc-rp-mo"
            },
            "publishTime": "2022-02-25T20:18:26Z"
          }
        ],
  */

  const testimonials = await prisma.testimonial.findMany();
  if (testimonials.length === 0) {
    const images = await prisma.image.createManyAndReturn({
      data: [
        {
          name: "Valéria Machado Rilho",
          description: "testimonial-valeria-machado-rilho",
          url: "https://lh3.googleusercontent.com/a-/ALV-UjVFNL0MiHYGAOG_EhaXLexeOpKDt_PjlV6q0tvP6BJrHbAvzv0o=s128-c0x00000000-cc-rp-mo",
        },
        {
          name: "Mariana Monteiro",
          description: "testimonial-mariana-monteiro",
          url: "https://lh3.googleusercontent.com/a-/ALV-UjVbVNOTVlmnIUu8K2FGHOZ5tKbszVimbiE8B2LciIGX6B6pGL3d=s128-c0x00000000-cc-rp-mo",
        },
        {
          name: "Alice Hoffmann",
          description: "testimonial-alice-hoffmann",
          url: "https://lh3.googleusercontent.com/a/ACg8ocIh24Q2q8WltldY5_5vDeCSwU3t2AQJNTDHkTXrSCxAae9RIw=s128-c0x00000000-cc-rp-mo",
        },
        {
          name: "Juares Steinmetz",
          description: "testimonial-juares-steinmetz",
          url: "https://lh3.googleusercontent.com/a/ACg8ocJjgVrnRXN6Kis8-QHQkp4uoxonVloMKKn5d4buDAYjyqMhpQ=s128-c0x00000000-cc-rp-mo",
        },
        {
          name: "Mirassul Pereira",
          description: "testimonial-mirassul-pereira",
          url: "https://lh3.googleusercontent.com/a-/ALV-UjWqrLxJhbPVeY2EAWpsQ2jOumWRUxC490fKN6U1XpoJhs7XzM0o=s128-c0x00000000-cc-rp-mo",
        },
      ],
    });

    await prisma.testimonial.createMany({
      data: [
        {
          name: "Valéria Machado Rilho",
          description:
            "O atendimento é excelente! Josy e Luiz são extremamente competentes, queridos e possuem um conhecimento e experiência enorme. A melhor floricultura e prestação de serviços de paisagismo de Capão da Canoa. 💛",
          job: "",
          imageId: images[0].id,
        },
        {
          name: "Mariana Monteiro",
          description:
            "Minha experiência com a cultura verde é muito positiva.  cumprem sempre com o que foi projetado e o melhor ainda o jardim é muito bem cuidado o ano inteiro.",
          job: "",
          imageId: images[1].id,
        },
        {
          name: "Alice Hoffmann",
          description:
            "Minha experiência com a cultura verde é muito positiva.  cumprem sempre com o que foi projetado e o melhor ainda o jardim é muito bem cuidado o ano inteiro.",
          job: "",
          imageId: images[2].id,
        },
        {
          name: "Juares Steinmetz",
          description:
            "Ótima empresa, já  fiz 3 paisagismo com eles e não abro mão!\nSuper recomendo.",
          job: "",
          imageId: images[3].id,
        },
        {
          name: "Mirassul Pereira",
          description:
            "Atendimento incrível somado o conhecimento profundo trouxeram resultados muito acima da expectativa. Parabéns!!!!",
          job: "",
          imageId: images[4].id,
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
      await prisma.comment.createMany({
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
