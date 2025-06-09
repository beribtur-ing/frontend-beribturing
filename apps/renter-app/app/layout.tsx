import type React from "react"
import {AuthProvider} from "@/contexts/auth-context"
import './globals.css'

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html>
            <body>
            <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    )
}

export const metadata = {
    generator: 'v0.dev'
};
