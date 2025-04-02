import {
    ClerkProvider,
} from '@clerk/nextjs'
import "./globals.css";


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <main className='text-white'>
                {children}
            </main>
        </ClerkProvider>
    );
}
