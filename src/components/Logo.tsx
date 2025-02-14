import Link from "next/link";
import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/">
      <div className={twMerge("flex items-center space-x-2", className)}>
        {/* Logo Image */}
        <Image src="/logo.jpg" alt="KhanAura Logo" width={40} height={40} />

        {/* Logo Text */}
        <h1 className="text-2xl text-accent hover:text-darkOrange font-bold relative group overflow-hidden duration-300">
          KhanAura
          <span className="absolute w-full h-px bg-darkOrange inline-block left-0 bottom-0 -translate-x-[110%] group-hover:translate-x-0 duration-300" />
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
