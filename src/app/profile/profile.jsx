'use client'
import SignOut from "@/components/signOut";

export default function ProfilePage({user}) {
    return(
        <>
            <div className="flex-initial" user={user}/>
            <div className="mt-20">
                <SignOut/>
            </div>
        </>
    )
}
