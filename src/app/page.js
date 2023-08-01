'use client';

import Auth from '@/components/Auth';
import {useAuth, VIEWS} from '@/components/authProvider';
import ResponsiveAppBar from "@/components/UI/appBar";
import SignOut from "@/components/signOut";
import DataTable from "@/components/data/DataTable";

export default function Home() {
    const {user, view, signOut} = useAuth();

    if (view === VIEWS.UPDATE_PASSWORD) {
        return <Auth view={view}/>;
    }

    if (user) {
        return (
            <>
                <ResponsiveAppBar className="flex-initial" user={user}/>
                <div
                    className="flex w-full flex-1 shrink-0 flex-col items-center justify-center px-8 text-center sm:px-20 mt-24">
                    <DataTable />
                </div>
            </>
        );
    }

    return <Auth view={view}/>;
}
