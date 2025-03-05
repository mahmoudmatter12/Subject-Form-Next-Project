import {
  ClerkProvider,
} from '@clerk/nextjs'


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
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
