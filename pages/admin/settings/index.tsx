import GradientCircle from "@/components/box/gradient-circle";
import { ImageCard } from "@/components/card/image-card";
import MetricCard from "@/components/card/MetricCard";
import List from "@/components/list/list";
import TableItemWrapper from "@/components/list/list-item-wrapper";
import SparklesText from "@/components/magicui/sparkles-text";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import UserEditor from "@/components/ui/user/user-editor";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { Image, Prisma, User } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { GalleryHorizontal, PlusIcon, UserIcon } from "lucide-react";
import { useState } from "react";

export async function getServerSideProps() {
    const comments = await prisma.comment.findMany();
    const users = await prisma.user.findMany();
    const images = await prisma.image.findMany();

    return { props: { users, images, comments } };
}

export default function AdminSettings({ comments, images, users }: { users: User[], images: Image[], comments: Comment[] }) {
    const [userList, setUserList] = useState<User[]>(users);

    const handleChangeUser = async ({ item: updatedUser, method }: {
        item?: any;
        method?: keyof Prisma.AccountDelegate<DefaultArgs> | undefined;
    }) => {

        switch (method) {
            case "update":
                setUserList((prev) => prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
                break;
            case "create":
                setUserList((prev) => [...prev, updatedUser]);
                break;
            case "delete":
                setUserList((prev) => prev.filter((user) => user.id !== updatedUser.id));
                break;
            default:
                break;
        }
    };

    return (
        <ul className="grid md:grid-cols-2 lg:grid-cols-5 mb-8 gap-6 my-6">
            <li className="gap-6 col-span-full grid md:grid-cols-2 lg:grid-cols-5 mb-2">
                <MetricCard className="h-full">
                    <div className="flex justify-between">
                        <div className="relative z-10 font-bold text-md text-neutral-700/60 uppercase flex flex-col">
                            <span>Usuários</span>
                            <b className="text-4xl mt-2">{userList.length}</b>
                        </div>
                        <GradientCircle className="h-12" index={1}>
                            <UserIcon />
                        </GradientCircle>
                    </div>
                </MetricCard>
                <MetricCard className="h-full">
                    <div className="flex justify-between">
                        <div className="relative z-10 font-bold text-md text-neutral-700/60 uppercase flex flex-col">
                            <span>Galeria de Imagens</span>
                            <b className="text-4xl mt-2">{images.length}</b>
                        </div>
                        <GradientCircle className="h-12" index={0}>
                            <GalleryHorizontal />
                        </GradientCircle>
                    </div>
                </MetricCard>
            </li>
            <li className="relative col-span-2 space-y-4 p-4 border border-neutral-200 rounded-3xl bg-neutral-100 shadow-md">
                <div className="flex flex-col gap-4">
                    <div className=" flex items-center gap-2">
                        <UserIcon className="h-5 w-5" />
                        <SparklesText
                            text={"Usuários"}
                            className={cn("text-neutral-700 text-2xl font-bold ")}
                            duration={5}
                            sparklesCount={2}
                            colors={{ first: "#70b266", second: "#cfe5cc" }}
                        />

                    </div>
                </div>
                <TableItemWrapper onSubmit={handleChangeUser}

                    clickArea={
                        <Button variant={'outline'} className="absolute  right-2 top-2 rounded-3xl flex justify-between space-x-2">
                            <PlusIcon className=" w-6 h-6 text-neutral-800" />
                        </Button>
                    }
                >
                    <UserEditor tableName={"user"} method="create" onClose={handleChangeUser} />
                </TableItemWrapper>
                <Table>
                    <TableHeader >
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>E-mail</TableHead>
                            <TableHead>Verificado</TableHead>
                        </TableRow>

                    </TableHeader>
                    <TableBody>
                        {userList.map((user) => (
                            <TableItemWrapper
                                onSubmit={handleChangeUser}
                                key={user.id}
                                clickArea={
                                    <TableRow className={cn("cursor-pointer hover:bg-neutral-50", user.emailVerified && "bg-green-100")}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.emailVerified ? "Sim" : "Não"}</TableCell>
                                    </TableRow>
                                }
                            >
                                <UserEditor
                                    item={user as any}
                                    onClose={handleChangeUser}
                                    tableName={"user"}
                                    method="update"
                                />
                            </TableItemWrapper>
                        ))}
                    </TableBody>
                </Table>
                {userList.length === 0 && (
                    <div className="flex justify-center items-center text-center text-md font-bold h-40">
                        Nenhum e-mail encontrado
                    </div>
                )}
            </li>
            <li className="col-span-3 space-y-4 border border-neutral-200 rounded-3xl bg-neutral-100 shadow-md">
                <List
                    items={images}
                    tableName={"image"}
                    className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4 h-full gap-2   "
                    itemsPerPage={18}
                    enableEditor
                    header={{ title: "Galeria de Imagens" }}
                >
                    {/* @ts-ignore */}
                    <ImageCard />
                </List>
            </li>
        </ul>
    );
}
