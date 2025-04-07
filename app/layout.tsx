import {
  ClerkProvider,
} from '@clerk/nextjs'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "@/components/ui/sonner"
import { dark } from '@clerk/themes'
import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import { FaUniversity } from 'react-icons/fa'
import "./globals.css";
import AccountMenu from '@/components/utils/AccountMenu';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Student Union Portal",
  description: "Comprehensive platform for student academic management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider 
      appearance={{
        baseTheme: dark,
        variables: { 
          colorPrimary: '#7c3aed',
          colorText: '#ffffff',
          colorBackground: '#1e1b4b',
          colorInputBackground: '#312e81'
        },
        elements: {
          card: 'bg-gray-900 border border-gray-700',
          headerTitle: 'text-violet-400',
          headerSubtitle: 'text-gray-300',
          socialButtonsBlockButton: 'border-gray-700 hover:bg-gray-800',
          dividerLine: 'bg-gray-700',
          dividerText: 'text-gray-300',
          formFieldLabel: 'text-gray-300',
          formFieldInput: 'bg-gray-800 border-gray-700 text-white focus:border-violet-400 focus:ring-violet-400',
          footerActionText: 'text-gray-400',
          footerActionLink: 'text-violet-400 hover:text-violet-300',
        }
      }}
    >
      <html lang="en" className={inter.className}>
        <body className="min-h-screen bg-gradient-to-br from-gray-900 via-cyan-800 to-gray-900" suppressHydrationWarning>
         
         
          {/* Navigation Bar */}
          {/* Main Content */}
          <AccountMenu />
          <main className="container mx-auto md:px-6  pt-12 pb-12 costom-scrollbar">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-900/80 border-t border-gray-800 py-8">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                  <FaUniversity className="text-sky-500" />
                  <span className="font-medium text-sky-500">Student Union Portal</span>
                </div>
                <div className="flex space-x-6">
                  <a href="/about" className="text-gray-400 hover:text-sky-400 transition-colors">About</a>
                  <a href="/contact" className="text-gray-400 hover:text-sky-400 transition-colors">Contact</a>
                  <a href="/privacy" className="text-gray-400 hover:text-sky-400 transition-colors">Privacy</a>
                  <a href="/terms" className="text-gray-400 hover:text-sky-400 transition-colors">Terms</a>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
                <p>
                  © {typeof window !== 'undefined' ? new Date().getFullYear() : '2023'} Student Union Portal. All rights reserved.
                </p>
              </div>
            </div>
          </footer>

          {/* Notifications */}
          <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            toastClassName="bg-gray-800 border border-gray-700"
            progressClassName="bg-violet-500"
          />
          <Toaster 
            position="top-right" 
            theme="dark"
            toastOptions={{
              classNames: {
                toast: 'bg-gray-800 border border-gray-700',
                title: 'text-gray-100',
                description: 'text-gray-300',
                actionButton: 'bg-violet-600',
                cancelButton: 'bg-gray-700'
              }
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}