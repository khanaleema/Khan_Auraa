"use client";
import Link from "next/link";
import { HiMenuAlt2 } from "react-icons/hi";
import SearchInput from "./SearchInput";
import Logo from "./Logo";
import { navBarList } from "@/constants";
import { useState, useEffect } from "react";

interface UserSession {
  user?: {
    email?: string;
  };
}

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState<UserSession | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/session");
        if (!res.ok) throw new Error("Session fetch failed");
        const data = await res.json();
        setSession(data.session || null);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };
    fetchSession();
  }, []);

  return (
    <header className="w-full h-20 bg-white border-b border-lightText/20 sticky top-0 z-50">
      <div className="h-full max-w-screen-xl mx-auto px-4 flex items-center justify-between gap-5 lg:gap-10">

        {/* ✅ Mobile Menu Icon (Toggle Button) */}
        <HiMenuAlt2
          className="md:hidden cursor-pointer w-8 h-6 z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        />

        {/* ✅ Logo (Always Visible) */}
        <Logo />

        {/* ✅ Search Input (Hidden on Small Screens) */}
        <div className="hidden md:block flex-1">
          <SearchInput />
        </div>

        {/* ✅ Mobile Overlay (Click to Close) */}
        {menuOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black/40 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          ></div>
        )}

        {/* 🔹 Sidebar Menu for Mobile */}
        <div
          className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"
            } md:relative md:w-auto md:h-auto md:shadow-none md:translate-x-0 md:flex`}
        >
          {/* ❌ Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-700 text-xl md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>

          {/* 🔹 Menu Items */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-7 p-6 md:p-0 w-full">
            {navBarList.map((item) => (
              <Link
                href={item?.link}
                key={item?.link}
                className="text-lg font-medium text-gray-800 hover:text-darkOrange duration-300 py-3 border-b border-gray-300 md:border-none w-full text-center"
                onClick={() => setMenuOpen(false)}
              >
                {item?.title}
              </Link>
            ))}

            {/* ✅ Studio Button for Admin */}
            {session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
              <Link
                href={"/studio"}
                className="text-lg font-medium text-gray-800 hover:text-darkOrange duration-300 py-3 border-b border-gray-300 md:border-none w-full text-center"
                onClick={() => setMenuOpen(false)}
              >
                Studio
              </Link>
            )}

            {session ? (
              <Link
                href={"/dashboard"}
                className="text-lg font-medium text-gray-800 hover:text-darkOrange duration-300 py-3 border-b border-gray-300 md:border-none w-full text-center"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href={"/signin"}
                className="text-lg font-medium text-gray-800 hover:text-darkOrange duration-300 py-3 border-b border-gray-300 md:border-none w-full text-center"
                onClick={() => setMenuOpen(false)}
              >
                Sign in
              </Link>
            )}

            {session?.user && (
              <Link
                href={"/orders"}
                className="text-lg font-medium text-gray-800 hover:text-darkOrange duration-300 py-3 border-b border-gray-300 md:border-none w-full text-center"
                onClick={() => setMenuOpen(false)}
              >
                Orders
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Mobile Search Bar (Only Visible on Small Screens) */}
      <div className="block md:hidden px-4 mt-2">
        <SearchInput />
      </div>
    </header>
  );
};

export default Header;
