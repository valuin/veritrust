import Image from "next/image";
import { MapPin, Bell, LayoutGrid } from "lucide-react";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Header */}
      <header className="bg-[#0039c7] text-white py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 mr-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    d="M12 2L4 6V12C4 15.31 7.58 20 12 22C16.42 20 20 15.31 20 12V6L12 2Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold">VeriTrust</span>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li className="border-b-2 border-white pb-1">
                  <a href="#" className="font-medium">
                    Find Aid
                  </a>
                </li>
                <li>
                  <a href="#" className="font-medium">
                    Saved Aid
                  </a>
                </li>
                <li>
                  <a href="#" className="font-medium">
                    News
                  </a>
                </li>
                <li>
                  <a href="#" className="font-medium">
                    Testimonial
                  </a>
                </li>
                <li>
                  <a href="#" className="font-medium">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Myanmar, MY</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-[#d9d9d9] flex items-center justify-center overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VeriTrust-yBZAO2AQekihzEE5IocLsdAaslToNM.png"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center overflow-hidden">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Flag"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}