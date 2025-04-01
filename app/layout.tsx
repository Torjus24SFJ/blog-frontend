import type { Metadata } from "next";
import "./globals.css";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
// import { motion } from "motion/react";

export const metadata: Metadata = {
  title: "Blog",
  description: "A blog page using sanity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <header className="bg-neutral-300 w-screen h-20 flex flex-row justify-between p-6">
          <Link href="/">
            <IoIosArrowBack
              size={30}
              className="text-black hover:opacity-80 hover:scale-130 transform hover:delay-200 transition-transform duration-200 ease-in-out cursor-pointer"
            />
          </Link>
          <h1 className="text-2xl text-blue-500 font-bold">My blog</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
