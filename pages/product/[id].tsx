import Page from '@/components/page';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { generateWhatsAppLink } from '@/lib/utils';
import { PrismaClient, Product as ProductType } from '@prisma/client';
import { Coins } from 'lucide-react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from "next/link";
import { useEffect, useState } from 'react';
import ProductsBreadcrumb from './products-breadcrumb';
import prisma from '@/lib/prisma';

const getMessage = (product: ProductType, quantity: number, price: number) => {
    const currencyPrice = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    return `Olá, Tudo bem? Estou interessado em comprar ${quantity} unidade(s) do produto ${product.name} pelo preço de ${currencyPrice} cada. Poderia me fornecer mais informações?`;
};


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as { id: string };
    const product = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: {
            images: true, categories: true, orders: {
                select: {
                    review: true
                }
            }
        },
    });

    const relatedProducts = await prisma.product.findMany({
        where: {
            categories: product?.categories.length ? {
                some: {
                    id: {
                        in: product.categories.map(category => category.id)
                    }
                }
            } : {},
            NOT: { id: Number(id) },
        },
        include: {
            images: true
        },
        take: 5,
    });

    return {
        props: {
            product,
            relatedProducts,
            whatsapp: process.env.WHATSAPP_NUMBER
        },
    };
};

type Product = ProductType & { images: { url: string, name: string }[] };

const ProductPage = ({ product, relatedProducts, whatsapp }: { product: Product, relatedProducts: Product[], whatsapp: string }) => {

    const [selectedImage, setSelectedImage] = useState<Number>(0);

    function handleImageClick(index: Number) {
        setSelectedImage(index);
    }


    const [quantity, setQuantity] = useState<string>('1');

    useEffect(() => {

        if (product.stock < Number(quantity)) {
            setQuantity('1');
        }

    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [product]);

    return (
        <Page className='bg-white py-40 relative font-montserrat'>
            <div className='absolute h-36 top-0 w-full bg-primary-100'>
                <Image src={product.images[0]?.url || ""} alt="background" fill objectFit="cover" objectPosition="center" className='brightness-50 blur-md' />
            </div>
            <div className="grid md:grid-cols-5 gap-4 items-start px-4 mx-auto  max-w-screen-2xl ">
                <div className='col-span-full'>
                    <ProductsBreadcrumb
                        links={[
                            { href: '/', name: 'Início' },
                            { href: '/products', name: 'Produtos' },
                            { href: `/product/${product.id}`, name: product.name },
                        ]}
                    />
                </div>
                <div className="md:col-span-3 grid md:grid-cols-6 gap-4 items-start">
                    <div className="hidden md:flex flex-col gap-4 items-start">
                        {product.images.map((image, index) => (
                            <button key={index} className={`border hover:border-primary rounded-xl overflow-hidden transition-colors w-full relative aspect-square ${selectedImage === index ? 'border-primary' : ''}`} onClick={() => handleImageClick(index)}>
                                <Image
                                    src={image?.url || ""}
                                    alt={`Preview thumbnail ${index + 1}`}
                                    fill
                                    className="aspect-[5/6] object-cover"
                                />
                                <span className="sr-only">View Image {index + 1}</span>
                            </button>
                        ))}
                    </div>
                    <div className="relative md:col-span-5 h-[60dvh] border rounded-xl bg-neutral-200/50">

                        <Image
                            src={product.images[selectedImage as any]?.url || '/placeholder.svg'}
                            alt="Product Image"
                            fill
                            className="aspect-[2/3] object-contain w-full "
                        />
                    </div>
                </div>
                <div className="md:col-span-2 grid gap-4 md:gap-4 h-full">
                    <div className="grid gap-2 mb-auto">

                        <h1 className="font-semibold text-3xl lg:text-4xl">{product.name}</h1>
                        <Separator className='w-full bg-neutral-300' />
                        <div className="grid gap-4 text-sm leading-loose mb-10">
                            <h2 className="text-2xl font-bold">Detalhes do produto</h2>
                            <p className="text-xl">{product.description}</p>
                        </div>
                    </div>
                    <span className='h-auto flex flex-col justify-end'>
                        <div className="grid gap-4 ">
                            <div className="flex flex-col  gap-4">
                                <p className="text-sm text-neutral-400">
                                    Preço {`(${product.unitType || 'un'})`}
                                </p>
                                <div className="text-3xl text-gray-200  font-montserrat">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price * Number(quantity))}</div>
                            </div>
                        </div>
                        <form className="grid gap-4">
                            <div className="flex space-x-4 items-center">
                                <Label htmlFor="quantity" className="text-base">
                                    Quantidade
                                </Label>
                                <Select defaultValue={quantity} onValueChange={setQuantity}>
                                    <SelectTrigger className="w-24 bg-white ">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {Array.from({ length: product.stock > 10 ? 10 : product.stock }, (_, i) => (
                                            <SelectItem key={i} value={String(i + 1)}>
                                                {i + 1}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-4 relative justify-end">
                                <Button variant="swipe" className="flex  items-center w-full gap-4 z-10 border-neutral-100 hover:bg-gray-300 bg-gray text-primary-200 hover:text-neutral-700">
                                    <Coins className="h-4 w-4 mr-2" />
                                    <span className="text-neutral-600">
                                        Compre Já!
                                    </span>
                                </Button>
                                <Link className="absolute z-10 inset-0" target='_blank' href={generateWhatsAppLink({ phoneNumber: whatsapp, message: getMessage(product, Number(quantity), product.price * Number(quantity)) })} />

                            </div>
                        </form>
                    </span>
                </div>
                <Separator className='w-full bg-neutral-300 col-span-full my-8' />

                <div className=" col-span-full grid gap-4">
                    <h2 className="text-2xl font-bold">Produtos Relacionados</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {relatedProducts?.length ? relatedProducts.map((product, index) => (
                            <div key={index} className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-xl shadow-lg group hover:shadow-xl hover:-translate-y-2">
                                <Link href={`/product/${product.id}`} className="absolute inset-0 z-10" prefetch={false}>
                                    <span className="sr-only">View</span>
                                </Link>
                                <Image
                                    src={product.images[0]?.url || ""}
                                    alt={product.name}
                                    width={500}
                                    height={400}
                                    className="object-cover w-full h-64 group-hover:opacity-50 transition-opacity"
                                    style={{ aspectRatio: "500/400", objectFit: "cover" }}
                                />
                                <div className="p-4 bg-background">
                                    <h3 className="text-xl font-bold">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {product.description}
                                    </p>
                                    <h4 className="text-lg font-semibold md:text-xl">
                                        {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                                    </h4>
                                </div>
                            </div>
                        ))
                            : <p>Não foram encontrados produtos relacionados</p>
                        }
                    </div>
                </div>
            </div>
        </Page>
    );

}

export default ProductPage;