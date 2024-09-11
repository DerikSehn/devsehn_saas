import { useToast } from '@/components/providers/toast-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { isFunction } from 'lodash';
import { useState } from 'react';
import zxcvbn from 'zxcvbn';
import { Switch } from '../switch';
import { TableItemEditorProps } from '@/types/item-editor';

interface User {
    id: string;
    name?: string;
    email: string;
    emailVerified?: Date;
    password: string;
}

type UserEditorProps = TableItemEditorProps

async function createUser(user: User) {
    const res = await fetch('/api/protected/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!res.ok) {
        throw new Error('Erro ao criar usuário.');
    }
    return res.json();
}

async function updateUser(user: User) {
    const res = await fetch(`/api/protected/users`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!res.ok) {
        throw new Error('Erro ao atualizar usuário.');
    }
    return res.json();
}

async function updatePassword(user: User) {
    const res = await fetch(`/api/protected/users/${user.id}/password`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: user.password }),
    });
    if (!res.ok) {
        throw new Error('Erro ao atualizar senha.');
    }
    return res.json();
}

async function deleteUserFn(user: User) {
    const res = await fetch(`/api/protected/users`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: user.id }),
    });
    if (!res.ok) {
        throw new Error('Erro ao excluir usuário.');
    }
    return res.json();
}

const UserEditor: React.FC<UserEditorProps> = ({ item, method, onClose }) => {
    const [user, setUser] = useState<User>(item as any || {
        name: '',
        email: '',
        emailVerified: undefined,
        password: '',
    });
    const [newPassword, setNewPassword] = useState('');

    const notify = useToast();

    const mutation = useMutation({
        mutationFn: method === 'create' ? createUser : updateUser,
        onSuccess: (data) => {
            isFunction(onClose) && onClose({ item: user.id ? user : data.user, method });
        },
        onError: () => notify(`Erro ao ${method === 'create' ? 'criar' : 'atualizar'} usuário.`, { type: 'error' }),
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate(user);
    };

    const passwordMutation = useMutation({
        mutationFn: updatePassword,
        onSuccess: () => {
            notify(`Senha atualizada com sucesso.`, { type: 'success' })
        },
        onError: () => notify(`Erro ao trocar senha.`, { type: 'error' }),
    });

    const handleChangePassword = () => {
        passwordMutation.mutate({ ...user, password: newPassword });
    };

    const deleteUser = useMutation({
        mutationFn: deleteUserFn,
        onSuccess: () => {
            isFunction(onClose) && onClose({ item: user as any, method: 'delete' });
        },
        onError: () => notify(`Erro ao excluir usuário.`, { type: 'error' }),
    });

    const handleDelete = (e: any) => {
        e.preventDefault();
        deleteUser.mutate(user);
    };

    const passwordScore = checkPasswordStrength(newPassword);
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                    id="name"
                    type="text"
                    value={user.name || ''}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                />

            </div>
            <div className="relative grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    required
                />
                <div className="absolute right-2 flex flex-col items-end gap-2">
                    <Label title="Ao marcar esta opção, o email será verificado automaticamente."
                        htmlFor="emailVerified">Email Autorizado</Label>
                    <Switch
                        id="emailVerified"
                        className='bg-red text-white my-2'
                        checked={!!user.emailVerified}
                        onCheckedChange={(checked) => {
                            setUser({ ...user, emailVerified: checked ? new Date() : undefined })
                        }}
                    />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="password">Nova Senha</Label>
                <div className="relative">
                    <Input
                        id="password"
                        value={item ? newPassword : user.password}
                        placeholder="Digite uma nova senha"
                        onChange={(e) => item ? setNewPassword(e.target.value) : setUser({ ...user, password: e.target.value })}
                    />
                    <Button
                        variant={'outline'}
                        type="button"
                        disabled={passwordScore < 3}
                        className={cn("absolute right-0 top-0 h-full",
                            !item && 'hidden',
                            passwordMutation.isPending ? 'cursor-not-allowed' : '',
                            passwordMutation.isSuccess ? 'cursor-not-allowed' : 'bg-green/40'
                        )}
                        onClick={handleChangePassword}
                    >
                        {passwordMutation.isPending ? 'Trocando...' : passwordMutation.isSuccess ? 'Senha Atualizada' : 'Trocar Senha'}
                    </Button>
                </div>
                {/* passwordBar */}
                <div className="relative h-5">
                    {newPassword && passwordStrength[passwordScore]}
                </div>

            </div>
            <Button type="submit" className="w-full">
                {mutation.isPending ? 'Salvando...' : 'Salvar'}
            </Button>
            {item ? <Button onClick={handleDelete} variant="destructive" className="w-full">
                {deleteUser.isPending ? 'Removendo...' : 'Remover'}
            </Button>
                : null
            }
        </form>
    );
};

export default UserEditor;

const passwordStrength = {
    0: 'Muito fraco',
    1: 'Fraco',
    2: 'Médio',
    3: 'Bom',
    4: 'Muito bom',
    5: 'Muito bom',
    6: 'Muito bom',
    7: 'Muito bom',
    8: 'Muito bom',
};

function checkPasswordStrength(password: string) {

    return zxcvbn(password).score
}