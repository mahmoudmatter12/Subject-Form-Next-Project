// app/layout.tsx
import DecorationElements from '@/components/DecorationElements';
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <main className="min-h-screen relative">
        {/* Navigation Bar */}
        <DecorationElements />
        {children}
        <ToastContainer />
      </main>
    </ClerkProvider>
  );
}