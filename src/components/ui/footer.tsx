import React from "react";
import { Separator } from "./separator";

const footerLinks = {
  usefulLinks: [
    "Problem",
    "Solution",
    "How it Works",
    "Technology",
    "Terms & Services",
  ],
  community: [
    "Help Center",
    "Partners",
    "Suggestions",
    "Blog",
    "Newsletters",
  ],
  partner: ["Our Partner", "Become a Partner"],
};

export function Footer() {
  return (
    <footer className="mt-16 bg-[#0039c7] pt-[75px] pb-[30px] px-[168px]">
      <div className="flex justify-between">
        <div>
          <div className="font-semibold text-white text-2xl mb-6 font-['Geist',Helvetica]">
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
          <div className="font-semibold text-white text-2xl mb-6 font-['Geist',Helvetica]">
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
          <div className="font-semibold text-white text-2xl mb-6 font-['Geist',Helvetica]">
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
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-normal text-[#ffffff99] text-lg text-center leading-[27px] font-['Abel',Helvetica]">
            Copyright
          </span>
          <img
            className="w-[17px] h-[17px] mx-2"
            alt="Copyright"
            src="/copyright-1.svg"
          />
          <span className="font-normal text-[#ffffff99] text-lg text-center leading-[27px] font-['Geist',Helvetica]">
            2025 VeriTrust. All Rights Reserved.
          </span>
        </div>
        <div className="flex space-x-6">
          <img
            className="w-[22px] h-[22px]"
            alt="Social"
            src="/vector-2.svg"
          />
          <img
            className="w-[22px] h-[22px]"
            alt="Social"
            src="/group.png"
          />
          <img className="w-6 h-5" alt="Social" src="/group-2.png" />
          <img
            className="w-[22px] h-[22px]"
            alt="Social"
            src="/vector-3.svg"
          />
        </div>
      </div>
    </footer>
  );
}