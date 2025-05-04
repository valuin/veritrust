import React from "react";
import { PrimeTwitter } from "../icons/twitter";
import { Separator } from "./separator";
import { MdiInstagram } from "../icons/instagram";

const footerLinks = {
  usefulLinks: [
    "Problem",
    "Solution",
    "How it Works",
    "Technology",
    "Terms & Services",
  ],
  community: ["Help Center", "Partners", "Suggestions", "Blog", "Newsletters"],
  partner: ["Our Partner", "Become a Partner"],
};

export function Footer() {
  return (
    <footer className="mt-16 bg-[#0039c7] pt-12 pb-8 px-4 md:px-[80px] lg:px-[168px]">
      <div className="flex flex-col md:flex-row md:justify-between gap-8">
        <div>
          <div className="font-semibold text-white text-xl md:text-2xl mb-4 md:mb-6 font-['Geist',Helvetica]">
            Useful Links
          </div>
          <ul>
            {footerLinks.usefulLinks.map((link, index) => (
              <li
                key={index}
                className="font-normal text-[#ffffffb2] text-base tracking-[0.16px] leading-[28.8px] font-['Poppins',Helvetica]"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white text-xl md:text-2xl mb-4 md:mb-6 font-['Geist',Helvetica]">
            Community
          </div>
          <ul>
            {footerLinks.community.map((link, index) => (
              <li
                key={index}
                className="font-normal text-[#ffffffb2] text-base tracking-[0.16px] leading-[28.8px] font-['Poppins',Helvetica]"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white text-xl md:text-2xl mb-4 md:mb-6 font-['Geist',Helvetica]">
            Partner
          </div>
          <ul>
            {footerLinks.partner.map((link, index) => (
              <li
                key={index}
                className="font-normal text-[#ffffffb2] text-base tracking-[0.16px] leading-[28.8px] font-['Poppins',Helvetica]"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Separator className="my-8 bg-white/30" />
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center flex-wrap gap-2">
          <span className="font-normal text-[#ffffff99] text-base md:text-lg text-center leading-[27px] font-['Abel',Helvetica]">
            Copyright
          </span>
          <img
            className="w-[17px] h-[17px] mx-2"
            alt="Copyright"
            src="/copyright-1.svg"
          />
          <span className="font-normal text-[#ffffff99] text-base md:text-lg text-center leading-[27px] font-['Geist',Helvetica]">
            2025 VeriTrust. All Rights Reserved.
          </span>
        </div>
        <div className="flex space-x-4 md:space-x-6">
          <MdiInstagram className="w-[22px] h-[22px] text-white" />
          <PrimeTwitter className="w-[22px] h-[22px] text-white" />
          <img className="w-[22px] h-[22px]" alt="Social" src="/vector-3.svg" />
        </div>
      </div>
    </footer>
  );
}
