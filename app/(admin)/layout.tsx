import {
    ClerkProvider,
} from '@clerk/nextjs'

import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Subject Form",
    description: "A form for submitting the rejested subjects",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className='bg-gradient-to-r from-gray-900 to-black text-white' >
                    <main>
                        {children}
                    </main>
                </body>
            </html>
        </ClerkProvider>
    );
}
