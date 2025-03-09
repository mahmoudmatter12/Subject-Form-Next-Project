import {
  ClerkProvider,
} from '@clerk/nextjs'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";
import "./globals.css";

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
        <body className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white p-8">
            {children}
            <ToastContainer />
        </body>
      </html>
    </ClerkProvider >
  );
}
