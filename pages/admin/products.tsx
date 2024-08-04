import CategoryCard from "@/components/card/category-card"
import { ProductCard } from "@/components/card/product-card"
import List from "@/components/list/list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import prisma from "@/lib/prisma"
import { Category, Product } from "@prisma/client"

export async function getServerSideProps() {
    const categories = await prisma.category.findMany({
        include: {
            products: true
        }
    })

    const products = await prisma.product.findMany({
        include: {
            images: true,
            categories: true
        }
    })

    return { props: { products, categories } }
}

export default function AdminProducts({ products, categories }: { products: Product[], categories: Category[] }) {

    return (
        <div className="w-full h-full grid md:grid-cols-2 gap-4">
            <Tabs defaultValue="products" className=" md:col-span-full">
                <TabsList className=" shadow-lg rounded-lg w-80">
                    <TabsTrigger value="products" className="w-full" >Produtos</TabsTrigger>
                    <TabsTrigger value="category" className="w-full" >Categorias</TabsTrigger>
                </TabsList>
                <TabsContent value="products">
                    <List items={products} tableName={'product'}
                        className=' grid md:grid-cols-2 lg:grid-cols-4 gap-3 bg-neutral-100 shadow-lg rounded-lg p-4'
                        itemsPerPage={18}
                        enableEditor
                        header={{ title: 'Produtos' }}
                    >

                        {/* @ts-ignore */}
                        <ProductCard className="" readOnly />
                    </List>
                </TabsContent>
                <TabsContent value="category">
                    <List items={categories} tableName={'category'}
                        className=' grid md:grid-cols-2 lg:grid-cols-4 gap-3 bg-neutral-100 shadow-lg rounded-lg p-4'
                        itemsPerPage={8}
                        enableEditor
                        header={{ title: 'Categorias' }}
                    >
                        {/* @ts-ignore */}
                        <CategoryCard className="min-h-28" isStatic />
                    </List>
                </TabsContent>
            </Tabs>
        </div>

    )
}
