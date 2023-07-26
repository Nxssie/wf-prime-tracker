'use client'
import SignOut from "@/components/signOut";

import Grid from "@mui/material/Unstable_Grid2";
import ResponsiveAppBar from "@/components/UI/appBar";

export default function ProfilePage({user}) {
    return(
        <>
            <ResponsiveAppBar className="flex-initial" user={user}/>
            <div className="mt-20">
                <SignOut/>
            </div>
        </>
    )
}
