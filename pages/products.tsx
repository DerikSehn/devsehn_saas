import { ProductCard } from '@/components/card/product-card';
import { Section } from '@/components/landingpage/section/section';
import Sidebar from '@/components/sidebar/sidebar';
import prisma from '@/lib/prisma';
import { cn } from '@/lib/utils';
import { ModelWithImages } from '@/prisma/prisma-utils';
import { Category as CategoryType, Product as ProductType } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { handleApiRequest } from './api/protected/crud';

const ProductPage = ({ categories, initialProducts }: { categories: CategoryType[], initialProducts: ModelWithImages<ProductType>[] }) => {
    const [products, setProducts] = useState<ModelWithImages<ProductType>[]>(initialProducts);
    const router = useRouter();
    const { category } = router.query;
    console.log(initialProducts)
    const links = [
        {
            title: "Pesquisar por categoria",
            items: categories.map((category) => ({
                href: `/products?category=${category.name}`,
                name: category.name,
            }))
        }
    ];
    useEffect(() => {
        const fetchProducts = async () => {
            console.log(category);

            const response = await handleApiRequest({
                where: category === 'Todos' ? {} : {
                    categories: { some: { name: category as string } }
                },
                include: {
                    images: true,
                    categories: true,
                },
            }, "product", 'findMany');

            console.log(response);
            setProducts(response?.result || []);
        };

        fetchProducts();
    }, [category]);
    return (
        <div className="bg-neutral-100 relative ">
            <div className="absolute w-full h-96 bg-primary-200 z-0">
                <Image
                    className="z-0 blur object-cover saturate-50 brightness-[.25] bg-primary-200"
                    src={"/uploads/dashboard/background.jpeg"} alt={'background'} fill />
            </div>
            <Section className="relative bg-transparent grid md:grid-cols-4 gap-8 pt-40 overflow-visible h-full  text-neutral-50 border-b border-neutral-300 w-full max-w-screen-2xl mx-auto items-start">
                <div className="col-span-full text-neutral-50 border-b border-neutral">
                    <div>
                        <h2 className="z-10 flex flex-col font-moglan uppercase font-thin text-left text-7xl">Produtos</h2>
                    </div>
                </div>
                <Sidebar className="hidden md:block sticky top-10 md:top-32 col-span-1 space-y-4 py-2 z-50 rounded-md shadow-md shadow-neutral-200 bg-neutral-100 border-neutral-200 overflow-hidden transition-all w-full h-auto min-h-[600px] mb-10"
                    animate={{ width: '100%' }}
                    whileHover={{ width: '100%' }}
                >
                    {links.map(({ title, items }, index) => (
                        <ul key={`${title}-${index}`} className='px-2 flex flex-col space-y-2'>
                            <h2 className="text-neutral-500 p-2 text-md font-montserrat font-bold tracking-wider border-b border-neutral-300 ">
                                {title}
                            </h2>
                            <li className='flex space-x-2'>
                                {items.map(({ href, name }, index) => (
                                    <Link prefetch={false} key={index} href={category === name ? `/products` : href} className={cn('flex w-auto hover:bg-neutral-200/70 p-2 rounded-md active:bg-neutral-200/80', category === name && 'bg-secondary-300/10')}>
                                        <div className='text-neutral-600 whitespace-nowrap overflow-hidden'>
                                            {name}
                                        </div>
                                    </Link>
                                ))}
                            </li>
                        </ul>
                    ))}
                </Sidebar>
                <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-neutral-100/5 bg-clip-padding backdrop-filter rounded-lg bg-opacity-0 h-auto min-h-[600px] mb-10">
                    {products?.length ? products.map((product) => (
                        <Link key={product.id} href={`/product/${product.id}`} className="relative col-span-1 w-full">
                            <ProductCard key={product.id} item={product} className="text-neutral-800" />
                        </Link>
                    ))
                        : null
                    }
                    {products?.length ? null : <div className="col-span-full flex flex-col items-start justify-start h-full p-4">
                        <h2 className="text-neutral-500 text-left text-xl font-montserrat font-bold tracking-wider">
                            Nenhum produto encontrado
                        </h2>
                    </div>
                    }
                </div>

            </Section>
        </div>
    );
};

export default ProductPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { category = 'Todos' } = context.query;
    console.log(category)
    const categories = await prisma.category.findMany();
    const products = category === 'Todos'
        ? await prisma.product.findMany({
            include: { images: true }
        })
        : await prisma.product.findMany({
            where: { categories: { some: { name: category as string } } },
            include: { images: true, categories: true }
        });
    console.log(products)

    return {
        props: {
            categories,
            initialProducts: products,
        },
    };
}
