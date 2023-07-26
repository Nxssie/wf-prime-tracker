'use client';

import Auth from '@/components/Auth';
import { useAuth, VIEWS } from '@/components/authProvider';
import ResponsiveAppBar from "@/components/UI/appBar";
import SignOut from "@/components/signOut";

export default function Home() {
  const { user, view, signOut } = useAuth();

  if (view === VIEWS.UPDATE_PASSWORD) {
    return <Auth view={view} />;
  }

  if (user) {
    return (
        <>
            <ResponsiveAppBar user={user}/>

        </>
    );
  }

  return <Auth view={view} />;
}
