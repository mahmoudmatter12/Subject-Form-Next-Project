import {
    ClerkProvider,
  } from '@clerk/nextjs'
  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import Header from '@/components/utils/Header';

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <ClerkProvider>
          <main className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white p-10">
              <Header />
              {children}
              <ToastContainer />
          </main>
      </ClerkProvider >
    );
  }
  