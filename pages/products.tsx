import { ProductCard } from '@/components/card/product-card';
import { Section } from '@/components/landingpage/section/section';
import Sidebar from '@/components/sidebar/sidebar';
import prisma from '@/lib/prisma';
import { ModelWithImages } from '@/prisma/prisma-utils';
import { Category as CategoryType, Product as ProductType } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ProductPage = ({ categories, initialProducts }: { categories: CategoryType[], initialProducts: ModelWithImages<ProductType>[] }) => {
    const [products, setProducts] = useState<ModelWithImages<ProductType>[]>(initialProducts);


    const links = [
        {
            title: "Categorias",
            items: categories.map((category) => ({
                href: `/products?category=${category.name}`,
                name: category.name,
            }))
        }
    ]

    return (
        <div className="bg-neutral-100 relative ">

            <div className="absolute w-full h-[136px] bg-primary-200 z-0">

                <Image
                    className="z-0 blur object-cover saturate-50 brightness-[.25] bg-primary-200 "
                    src={"/uploads/dashboard/background.jpeg"} alt={'background'} fill />

            </div>
            <Section className="bg-transparent grid md:grid-cols-4 gap-8 pt-40 overflow-visible  max-h-none h-auto text-neutral-50 border-b border-neutral-300  w-full  max-w-screen-2xl mx-auto">
                <div className="col-span-full text-neutral-700 border-b border-neutral ">
                    <div>
                        <h2 className="z-10 flex flex-col font-moglan uppercase font-thin text-left text-7xl">Produtos</h2>
                    </div>
                </div>

                <Sidebar className=" hidden md:block relative col-span-1 space-y-4 py-2 z-50 rounded-md shadow-md shadow-neutral-200 bg-neutral-100 overflow-hidden transition-all w-full h-auto min-h-[600px] mb-10"
                    animate={{ width: '100%' }}
                    whileHover={{ width: '100%' }}
                >
                    <h2 className="text-neutral-500 p-2 px-4 text-md font-montserrat  font-bold tracking-wider  ">
                        Pesquisar por categoria
                    </h2>
                    {links.map(({ title, items }, index) => (
                        <ul key={`${title}-${index}`} className='px-2 flex flex-col space-y-4'>
                            <small
                                className="opacity-0 group-hover/sidebar:opacity-80 duration-200 transition-opacity text-nowrap whitespace-nowrap text-xl font-bold"
                            >
                                {title}
                            </small>
                            <li
                                className=' flex flex-col'
                            >
                                {items.map(({ href, name }, index) => (
                                    <Link key={index} href={href} className='flex justify-center w-full items-center content-center hover:bg-neutral-200/10 p-2'>
                                        <div
                                            className='text-neutral-600 whitespace-nowrap overflow-hidden'
                                        >
                                            {name}
                                        </div>
                                    </Link>
                                ))}
                            </li>
                        </ul>
                    ))}
                </Sidebar>
                <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-neutral-100/5  bg-clip-padding backdrop-filter  rounded-lg bg-opacity-0   h-auto min-h-[600px] mb-10">
                    {products.map((product) => (
                        <Link key={product.id} href={`/product/${product.id}`} className="relative col-span-1 w-full">
                            <ProductCard key={product.id} item={product} className="text-neutral-800" />
                        </Link>
                    ))}
                </div>
            </Section>
        </div>
    );
};

export default ProductPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { category = 'Todos' } = context.query;

    const categories = await prisma.category.findMany();
    const products = category === 'Todos'
        ? await prisma.product.findMany({
            include: { images: true }
        })
        : await prisma.product.findMany({
            where: { categories: { some: { category: { name: category as string } } } },
            include: { images: true, categories: true }
        });

    return {
        props: {
            categories,
            initialProducts: products,
        },
    };
}
