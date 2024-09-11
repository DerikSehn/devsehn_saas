// pages/api-doc.tsx

import { BentoGridItem } from '@/components/bento-grid';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

// Importação dinâmica do SwaggerUI com SSR desativado
const SwaggerUI = dynamic(import('swagger-ui-react'), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <BentoGridItem variant='static' className='bg-gradient-to-b from-neutral-50 to-neutral-100 shadow-md h-full md:h-full '>
      <SwaggerUI spec={spec} />
    </BentoGridItem>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const spec = createSwaggerSpec({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'DevSehn API Documentation',
        version: '1.0',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      apis: ['pages/api/**/*.ts', '!pages/api/_*.ts'], // Caminho dos arquivos de API
    },
  });

  return {
    props: {
      spec,
    },
  };
}

export default ApiDoc;
