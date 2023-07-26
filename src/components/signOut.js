'use client';

import { useAuth } from './authProvider';
import {useRouter} from "next/navigation";

export default function SignOut() {
    const {signOut} = useAuth();
    const router = useRouter();

    async function handleSignOut() {
        const { error } = await signOut();

        if (error) {
            console.error('ERROR signing out:', error);
        }

        router.push('/')
    }

    return (
        <button type="button" className="bg-cyan-600 rounded px-4 py-2 text-white mb-6" onClick={handleSignOut}>
            Sign Out
        </button>
    );
}
