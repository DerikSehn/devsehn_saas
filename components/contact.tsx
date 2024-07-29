import Image from "next/image"
import { Section } from "./landingpage/section/section"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

export default function Contact() {
    return (<Section id="contact" className="bg-jet-900">
        <Image
            alt="Contact"
            className="object-cover object-center z-0 opacity-10"
            fill
            src="/contact/background.jpg" />
        <div className="relative z-10 container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Contate-nos</div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Vamos Planejar Seu Próximo Projeto</h2>
                    <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                        Preencha o formulário abaixo para entrar em contato com nossa equipe e começar a planejar seu próximo projeto inesquecível.
                    </p>
                </div>
            </div>
            <div className="mx-auto w-full max-w-md space-y-2">
                <form className="flex flex-col gap-4">
                    <Input className="max-w-lg flex-1" placeholder="Nome" type="text" />
                    <Input className="max-w-lg flex-1" placeholder="E-mail" type="email" />
                    <Textarea className="max-w-lg flex-1" placeholder="Mensagem" />
                    <Button type="submit">Enviar</Button>
                </form>
            </div>
        </div>
    </Section >)
}