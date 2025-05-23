"use client";
import React from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

const navLinks: string[] = [
  "Problem",
  "Solution",
  "How it works?",
  "Technology",
  "Contact Us",
];

export function Header() {
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getSectionId = (link: string): string => {
    switch (link) {
      case "Problem":
        return "problem-section";
      case "Solution":
        return "solution-section";
      case "How it works?":
        return "how-it-works-section";
      case "Technology":
        return "technology-section";
      case "Contact Us":
        return "contact-us-section";
      default:
        return "";
    }
  };

  return (
    <header className="flex bg-white flex-col lg:flex-row lg:justify-between lg:items-center px-4 lg:px-16 py-6 md:py-10 gap-4 md:gap-0">
      <div className="flex items-center" onClick={() => router.push("/dashboard")}>
        <div className="hidden lg:block">
          <img
            className="w-10 h-[29px]"
            alt="VeriTrust Logo"
            src="/group-1.png"
          />
        </div>
        <div className="hidden xl:flex ml-3 font-semibold text-[#2b2b2b] text-2xl tracking-[0] leading-[normal] font-['Geist',Helvetica]">
          VeriTrust
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 w-full md:w-auto">
        <nav className="hidden md:flex space-x-4">
          {navLinks.map((link, index) => (
            <Button
              key={index}
              variant="link"
              className="font-['Geist',Helvetica] font-medium text-black text-base"
              onClick={() => scrollToSection(getSectionId(link))}
            >
              {link}
            </Button>
          ))}
        </nav>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
          <Button
            className="h-9 md:h-10 w-full cursor-pointer md:w-32 bg-[#0039c7] rounded-[8px] font-['Geist',Helvetica] font-semibold text-white text-base md:text-lg"
            onClick={() => router.push("/landing/sign-up")}
          >
            Sign Up
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/landing/login")}
            className="h-9 md:h-10 w-full cursor-pointer md:w-32 rounded-[8px] border-2 border-[#0039c7] font-['Geist',Helvetica] font-semibold text-[#0039c7] text-base md:text-lg"
          >
            Log in
          </Button>
        </div>
      </div>
      {/* Mobile nav */}
      <nav className="flex md:hidden flex-wrap gap-2 mt-2">
        {navLinks.map((link, index) => (
          <Button
            key={index}
            variant="link"
            className="font-['Geist',Helvetica] font-medium text-black text-base px-2"
            onClick={() => scrollToSection(getSectionId(link))}
          >
            {link}
          </Button>
        ))}
      </nav>
    </header>
  );
}
