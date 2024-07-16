import Image from "next/image";
import { Section } from "./section";


export default function About() {
    return (
        <Section id="about" className="overflow-hidden py-12 md:py-24 lg:py-32 ">

            <Image
                alt="plant"
                className="object-contain opacity-40 object-bottom scale-[1.3] blur-[1px] -translate-x-[50vw] translate-y-1/4 rotate-[70deg] z-[5] "
                fill
                src="/service/plant.png" />
            <Image
                alt="plant"
                className="object-contain opacity-40 object-bottom scale-[1.5] blur-[1px] translate-x-[50vw] -translate-y-1/4 -rotate-[160deg] z-[5] "
                fill
                src="/service/plant.png" />

            {/* 
<Image

alt="Hero Image"
fill
className="object-cover object-center z-10 lg:scale-[1.4] translate-x-1/8 -translate-y-1/8 "

src="/hero/vector.svg" /> */}
            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-3xl bg-gray-100 px-3 py-1 text-sm dark:bg-primary-200">
                            Nossa Expertise
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                            Projetos e Execução
                        </h2>
                        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Com muita criatividade e técnica, estamos capacitados para elaborar e executar projetos paisagísticos,
                            transformando seu espaço em um ambiente acolhedor de acordo com sua necessidade.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                    <Image
                        alt="Plant"
                        className="mx-auto object-cover shadow-xl overflow-hidden rounded-3xl object-center sm:w-full lg:order-last"
                        height="310"
                        src="/service/bench.jpg"
                        width="550"
                    />
                    <div className="flex flex-col justify-center space-y-4">
                        <ul className="grid gap-6">
                            <li>
                                <div className="grid gap-1">
                                    <h3 className="text-xl font-bold">Manutenção</h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Alguns clientes que contratam projetos paisagísticos, optam por serviço de periódico de manutenção.
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="grid gap-1">
                                    <h3 className="text-xl font-bold">Consultoria</h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Oferecemos serviço de consultoria para o seu jardim, quando não é necessária a elaboração de um projeto.
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="grid gap-1">
                                    <h3 className="text-xl font-bold">Linha Madeira</h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Elaboramos bancos, cadeiras portuguesas, bancos pérgola, cachepôs, pérgolas e decks de acordo com cada ambiente. Todo esse material é feito com madeira tratada e de demolição.

                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Section>
    )
}