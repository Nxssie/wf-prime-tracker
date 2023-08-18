'use client';

import Auth from '@/components/Auth';
import {useAuth, VIEWS} from '@/components/authProvider';
import SignOut from "@/components/signOut";
import DataTable from "@/components/data/DataTable";
import {NextUIProvider} from "@nextui-org/react";

export default function Home() {
    const {user, view, signOut} = useAuth();

    if (view === VIEWS.UPDATE_PASSWORD) {
        return <Auth view={view}/>;
    }

    if (user) {
        return (
                <section
                    className="flex justify-center w-full text-center mt-24">
                    <DataTable />
                </section>
        );
    }

    return (
        <NextUIProvider>
            <Auth view={view}/>
        </NextUIProvider>
    );
}
