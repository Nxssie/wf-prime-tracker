'use client'
import SignOut from "@/components/signOut";

import Grid from "@mui/material/Unstable_Grid2";

export default function ProfilePage({user}) {
    return(
        <>
            <Grid container >
                <SignOut/>
            </Grid>
        </>
    )
}
