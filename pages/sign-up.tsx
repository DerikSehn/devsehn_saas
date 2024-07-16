import { useState } from 'react';
import { useRouter } from 'next/router';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hashedPassword = await bcrypt.hash(password, 10);
        await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password: hashedPassword }),
        });
        router.push('/signin');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Password
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Sign up</button>
        </form>
    );
}
