import React from "react";
import { Button } from "./button";

const navLinks: string[] = [
  "Problem",
  "Solution",
  "How it works?",
  "Technology",
  "Contact Us",
];

export function Header() {
  return (
    <header className="flex justify-between items-center px-16 py-10">
      <div className="flex items-center">
        <img
          className="w-10 h-[29px]"
          alt="VeriTrust Logo"
          src="/group-1.png"
        />
        <div className="ml-3 font-semibold text-[#2b2b2b] text-2xl tracking-[0] leading-[normal] font-['Geist',Helvetica]">
          VeriTrust
        </div>
      </div>
      <nav className="flex space-x-8">
        {navLinks.map((link, index) => (
          <Button
            key={index}
            variant="link"
            className="font-['Geist',Helvetica] font-medium text-black text-base"
          >
            {link}
          </Button>
        ))}
      </nav>
      <div className="flex space-x-4">
        <Button className="h-[50px] w-[173px] bg-[#0039c7] rounded-[10px] font-['Geist',Helvetica] font-semibold text-white text-2xl">
          Sign Up
        </Button>
        <Button
          variant="outline"
          className="h-[50px] w-[173px] rounded-[10px] border-2 border-[#0039c7] font-['Geist',Helvetica] font-semibold text-[#0039c7] text-2xl"
        >
          Log in
        </Button>
      </div>
    </header>
  );
}