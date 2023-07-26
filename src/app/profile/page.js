import Link from 'next/link';
import {redirect} from 'next/navigation';

import SignOut from '@/components/signOut';
import createClient from '@/lib/supabase-server';
import ProfilePage from "@/app/profile/profile";

export default async function Profile() {
    const supabase = createClient();

    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/');
    }

    return (
        <>
            <ProfilePage user={user}/>
        </>
    );
}
