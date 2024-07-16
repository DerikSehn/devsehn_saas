// pages/api-doc.tsx

import { BentoGridItem } from '@/components/bento-grid';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

/* @ts-ignore */
const SwaggerUI = dynamic<{ spec: any }>(import('swagger-ui-react'), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <BentoGridItem variant='static' className='bg-neutral-100 shadow-md h-full md:h-full '>
      <SwaggerUI spec={spec} />
    </BentoGridItem>
  )

}

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
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
        apiFolder: 'pages/api', // endpoints API,
        apis: ['*.ts', '!_*.ts'], // quais arquivos devem ser analisados,
      },
    }
  }
  )

  return {
    props: {
      spec,
    },
  }
}

export default ApiDoc;
