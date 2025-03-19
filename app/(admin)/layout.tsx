import {
    ClerkProvider,
} from '@clerk/nextjs'
import Header from '@/components/utils/Header';
import "./globals.css";


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
                    <main className='bg-gradient-to-r from-gray-900 to-black text-white p-10'>
                        <Header />
                        {children}
                    </main>
        </ClerkProvider>
    );
}
