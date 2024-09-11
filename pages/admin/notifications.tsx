import prisma from "@/lib/prisma";
import { ReceivedEmail } from "@prisma/client";

import Card from "@/components/card/card";
import MetricCard from "@/components/card/MetricCard";
import TableItemWrapper from "@/components/list/list-item-wrapper";
import { useToast } from "@/components/providers/toast-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { BellDotIcon, Mail } from "lucide-react";
import { useState } from "react";

export async function getServerSideProps() {
    const receivedEmails = await prisma.receivedEmail.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    return { props: { receivedEmails } };
}


const Notifications = ({ receivedEmails = [] }: { receivedEmails: ReceivedEmail[] }) => {
    const [emails, setEmails] = useState<ReceivedEmail[]>(receivedEmails);

    const notReadEmails = emails.filter(email => !email.isRead).length;

    // Função para marcar o e-mail como lido
    const markAsRead = async (emailId: number) => {
        try {
            const response = await fetch(`/api/protected/markAsRead/${emailId}`, {
                method: 'PATCH', // Método PATCH para atualização
            });

            if (!response.ok) {
                throw new Error("Erro ao marcar como lido");
            }

            // Atualize o estado local para refletir a mudança
            setEmails(prevEmails =>
                prevEmails.map(email =>
                    email.id === emailId ? { ...email, isRead: true } : email
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="col-span-12 ">
            <MetricCard
                className=""
            >
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <BellDotIcon className="h-5 w-5" />
                        <div className="text-lg font-semibold">Notificações</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        <p>Você tem {notReadEmails} notificações</p>
                    </div>
                </div>
            </MetricCard>
            <MetricCard

                isStatic
                className="min-h-96">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        <div className="text-lg font-semibold">Mensagens recebidas</div>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>E-mail</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Mensagem</TableHead>
                            <TableHead>Data</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {emails.map((receivedEmail) => (
                            <TableItemWrapper
                                key={receivedEmail.id} // Mover o key para o TableItemWrapper
                                clickArea={
                                    <TableRow
                                        role={'button'}
                                        onMouseLeave={() => !receivedEmail.isRead && markAsRead(receivedEmail.id)} // Chama a função com o ID do email
                                        className={cn("hover:bg-neutral-100 cursor-pointer", receivedEmail.isRead ? "bg-neutral-200" : "bg-neutral-50")}
                                    >
                                        <TableCell>{receivedEmail.email}</TableCell>
                                        <TableCell>{receivedEmail.name}</TableCell>
                                        <TableCell>
                                            <div className="line-clamp-1 max-w-sm">{receivedEmail.message}</div>
                                        </TableCell>
                                        <TableCell>{receivedEmail.createdAt.toLocaleString()}</TableCell> {/* Exemplo de data */}
                                    </TableRow>
                                }
                            >
                                <ReceivedEmailCard receivedEmail={receivedEmail} />
                            </TableItemWrapper>
                        ))}
                    </TableBody>
                </Table>
                {emails.length === 0 && <div className="flex justify-center items-center text-center text-md font-bold h-40 ">Nenhum e-mail encontrado</div>}

            </MetricCard>
        </div>
    );
};

export default Notifications;

/* Received Email Component. Its like reading a mail from inbox */
const ReceivedEmailCard = ({ receivedEmail }: { receivedEmail: ReceivedEmail }) => {
    const notify = useToast();
    const handleCopy = () => {
        navigator.clipboard.writeText(receivedEmail.email);
        notify('e-mail copiado para a área de transferência',
            { type: 'success' });
    };
    return (
        <Card isStatic className="group flex flex-col gap-4 py-2 border border-neutral-500 rounded-lg my-10">
            <div className="flex flex-1 flex-col">
                <div className="flex items-start p-4">
                    <div className="flex items-start gap-4 text-sm">
                        <Avatar>
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>{receivedEmail.name?.split(' ')[0]?.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <div className="font-semibold">{receivedEmail.name}</div>

                            <Button title="copiar e-mail" variant="ghost"
                                className=" line-clamp-1 text-xs p-0 my-0 h-auto"
                                onClick={handleCopy}>
                                {receivedEmail.email}
                            </Button>

                        </div>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground">{receivedEmail.createdAt.toLocaleString()}</div>
                </div>
                <Separator />
                <div className="flex-1 whitespace-pre-wrap p-4 text-md prose prose-sm prose-p:leading-normal">
                    {receivedEmail.message}
                </div>
            </div>
        </Card>
    )
}