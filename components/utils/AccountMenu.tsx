import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FiHome, 
  FiUser, 
  FiSettings, 
  FiLogOut,
  FiChevronDown,
  FiShield
} from 'react-icons/fi';
import { MdSchool } from 'react-icons/md';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import student from '@/types/student';
import { GetUser } from '@/lib/GetUser';
import { Button } from '@/components/ui/button';

async function AccountMenu() {
  const user = await GetUser({ pathName: "/" }) as student;

  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 border-t border-gray-800 backdrop-blur-lg dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="p-2 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 text-white">
            <MdSchool className="text-xl transition-transform group-hover:rotate-12" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
            Student Portal
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-4 sm:space-x-6">
          {user ? (
            <>
              {/* Desktop Links */}
              <div className="hidden md:flex items-center gap-6">
                <Link
                  href="/user/dashboard"
                  className="flex items-center gap-2 text-gray-700 text-white hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
                >
                  <FiHome size={18} />
                  Dashboard
                </Link>

                <Link
                  href="/user/profile"
                  className="flex items-center gap-2 text-gray-700 text-white hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
                >
                  <FiUser size={18} />
                  Profile
                </Link>

                {user.role === 'ADMIN' && (
                  <Link
                    href="/admin/dashboard"
                    className="flex items-center gap-2 text-gray-700 text-white hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
                  >
                    <FiShield size={18} />
                    Admin
                  </Link>
                )}
              </div>

              {/* Account Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 px-2 hover:bg-gray-700/10 rounded-lg"
                  >
                    {user.imgUrl ? (
                      <Image
                        src={user.imgUrl}
                        alt="Profile"
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full border-2 border-indigo-100"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-indigo-100 text-white flex items-center justify-center border-2 border-indigo-100 dark:border-indigo-900/50">
                        <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                          {user.fname?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                    <span className="hidden sm:inline text-gray-700 text-white">
                      {user.fname}
                    </span>
                    <FiChevronDown className="text-gray-500 text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-56 mt-2 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  align="end"
                >
                  <DropdownMenuLabel className="font-normal p-4">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">
                        {user.fname} {user.lname}
                      </p>
                      <p className="text-xs leading-none text-gray-500 ">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                  <DropdownMenuItem className="p-0 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <Link href="/user/profile" className="flex items-center w-full px-4 py-2">
                      <FiUser className="mr-2 text-gray-700" size={16} />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-0 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <Link href="/user/dashboard" className="flex items-center w-full px-4 py-2">
                      <FiHome className="mr-2 text-gray-700" size={16} />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-0 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <Link href="/user/settings" className="flex items-center w-full px-4 py-2">
                      <FiSettings className="mr-2 text-gray-700" size={16} />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  {user.role === 'ADMIN' && (
                    <>
                      <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                      <DropdownMenuItem className="p-0 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <Link href="/admin/dashboard" className="flex items-center w-full px-4 py-2">
                          <FiShield className="mr-2 text-gray-700" size={16} />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                  <DropdownMenuItem className="p-0 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <Link href="/sign-out" className="flex items-center w-full px-4 py-2 text-red-600 dark:text-red-400">
                      <FiLogOut className="mr-2" size={16} />
                      Sign Out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            /* Guest Navigation */
            <div className="flex items-center gap-3">
              <Link
                href="/sign-in"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-gray-700 text-white hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-sky-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-sky-700 transition-all shadow-md hover:shadow-lg"
              >
                Get Started
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default AccountMenu;