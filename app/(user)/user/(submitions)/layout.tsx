import Header from '@/components/utils/Header';
import {
    ClerkProvider,
} from '@clerk/nextjs'


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
                <body >
                    <main className='p-8'>
                        <Header />
                        {/* <div className="w-full max-w-6xl mx-auto flex justify-center ">
                            <div className="text-white text-2xl text-center border-1 p-3 rounded-2xl m-4 max-w-2xs ">
                                The
                                Submitions
                            </div>
                        </div> */}
                        {children}
                    </main>
                </body>
            </html>
        </ClerkProvider>
    );
}
