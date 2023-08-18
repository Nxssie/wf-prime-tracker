// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import {AuthProvider} from "@/components/authProvider";

export function Providers({children}) {
    return (
        <AuthProvider>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </AuthProvider>
    )
}
