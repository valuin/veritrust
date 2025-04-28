import Image from "next/image";
import { Search, MapPin, Bell, LayoutGrid, ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-[#d9d9d9] p-6">
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-2">Filters</h2>
            <h3 className="text-[#b5b5b5] mb-2">Schedule</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 mr-2 accent-[#0039c7]"
                  checked
                />
                <span>All</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="w-5 h-5 mr-2" />
                <span>On Going</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="w-5 h-5 mr-2" />
                <span>Done</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="w-5 h-5 mr-2" />
                <span>Coming Soon</span>
              </label>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-bold mb-2">Category</h2>
            <h3 className="text-[#b5b5b5] mb-2">Social Aid for</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 mr-2 accent-[#0039c7]"
                  checked
                />
                <span>All</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="w-5 h-5 mr-2" />
                <span>Refugees</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="w-5 h-5 mr-2" />
                <span>Orphans</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="w-5 h-5 mr-2" />
                <span>Single Mom</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="w-5 h-5 mr-2" />
                <span>Families in Poverty</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="w-5 h-5 mr-2" />
                <span>More Category</span>
              </label>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2">Country</h2>
            <h3 className="text-[#b5b5b5] mb-2">Select your country</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 mr-2 accent-[#0039c7]"
                  checked
                />
                <span>All</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="w-5 h-5 mr-2" />
                <span>USA</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="w-5 h-5 mr-2" />
                <span>China</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="w-5 h-5 mr-2" />
                <span>More Countries</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold mr-3">All Aid</h1>
              <span className="bg-[#f9f9f9] border border-[#d9d9d9] rounded-full px-4 py-1">
                653
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-full border border-[#d9d9d9] w-64"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-[#b5b5b5]" />
              </div>
              <div className="flex items-center">
                <span className="text-[#b5b5b5] mr-2">Sort by:</span>
                <div className="flex items-center">
                  <span className="font-medium">Last updated</span>
                  <ChevronDown className="w-5 h-5 ml-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Aid Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI Assistant Card */}
            <div className="bg-gradient-to-br from-[#0039c7] to-[#0039c7]/80 rounded-xl p-6 flex flex-col justify-between h-72 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <div className="w-64 h-64 rounded-full border-8 border-white/20 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border-8 border-white/30 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-8 border-white/40 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/50"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-auto relative z-10">
                <p className="text-white text-lg mb-4">
                  Didn't know where to apply?
                </p>
                <button className="bg-white text-[#0039c7] font-medium py-2 px-6 rounded-full">
                  Call AI
                </button>
              </div>
            </div>

            {/* Save the Children Card */}
            <div className="bg-[#ffde9d] rounded-xl p-6 flex flex-col justify-between h-72 relative">
              <div className="flex justify-between">
                <div className="bg-white rounded-full px-3 py-1 text-xs">
                  05 Oct 2025
                </div>
                <div className="flex space-x-2">
                  <Image
                    src="/placeholder.svg?height=24&width=24"
                    alt="Yemen Flag"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <button className="text-[#383838]">
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5C1 2.79086 2.79086 1 5 1H11C13.2091 1 15 2.79086 15 5V19L8 15.5L1 19V5Z"
                        stroke="#383838"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm mb-1">Save the Children</p>
                <h3 className="text-xl font-bold mb-3">
                  Orphan Support Program in Yemen
                </h3>
                <div className="inline-block border border-[#383838] rounded-full px-4 py-1 text-sm">
                  Orphans
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Save the Children Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <a href="#" className="text-sm underline">
                    Click here for details
                  </a>
                  <button className="bg-[#383838] text-white rounded-full px-4 py-2 text-sm">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>

            {/* UNHCR Card */}
            <div className="bg-[#e0f3ff] rounded-xl p-6 flex flex-col justify-between h-72 relative">
              <div className="flex justify-between">
                <div className="bg-white rounded-full px-3 py-1 text-xs">
                  20 Aug 2025
                </div>
                <div className="flex space-x-2">
                  <Image
                    src="/placeholder.svg?height=24&width=24"
                    alt="Myanmar Flag"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <button className="text-[#383838]">
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5C1 2.79086 2.79086 1 5 1H11C13.2091 1 15 2.79086 15 5V19L8 15.5L1 19V5Z"
                        stroke="#383838"
                        strokeWidth="2"
                        fill="#383838"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm mb-1">UNHCR</p>
                <h3 className="text-xl font-bold mb-3">
                  Rohingya Social Aid Program
                </h3>
                <div className="inline-block border border-[#383838] rounded-full px-4 py-1 text-sm">
                  Refugees
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="UNHCR Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <a href="#" className="text-sm underline">
                    Click here for details
                  </a>
                  <button className="bg-[#383838] text-white rounded-full px-4 py-2 text-sm">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>

            {/* CARE International Card */}
            <div className="bg-[#d9e4ff] rounded-xl p-6 flex flex-col justify-between h-72 relative">
              <div className="flex justify-between">
                <div className="bg-white rounded-full px-3 py-1 text-xs">
                  12 Jul 2025
                </div>
                <div className="flex space-x-2">
                  <Image
                    src="/placeholder.svg?height=24&width=24"
                    alt="USA Flag"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <button className="text-[#383838]">
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5C1 2.79086 2.79086 1 5 1H11C13.2091 1 15 2.79086 15 5V19L8 15.5L1 19V5Z"
                        stroke="#383838"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm mb-1">CARE International</p>
                <h3 className="text-xl font-bold mb-3">
                  Single Mothers Empowerment
                </h3>
                <div className="inline-block border border-[#383838] rounded-full px-4 py-1 text-sm">
                  Single Mom
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="CARE Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <a href="#" className="text-sm underline">
                    Click here for details
                  </a>
                  <button className="bg-[#383838] text-white rounded-full px-4 py-2 text-sm">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>

            {/* Red Cross Card */}
            <div className="bg-[#fbe2f3] rounded-xl p-6 flex flex-col justify-between h-72 relative">
              <div className="flex justify-between">
                <div className="bg-white rounded-full px-3 py-1 text-xs">
                  22 Jun 2025
                </div>
                <div className="flex space-x-2">
                  <Image
                    src="/placeholder.svg?height=24&width=24"
                    alt="Turkey Flag"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <button className="text-[#383838]">
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5C1 2.79086 2.79086 1 5 1H11C13.2091 1 15 2.79086 15 5V19L8 15.5L1 19V5Z"
                        stroke="#383838"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm mb-1">Red Cross</p>
                <h3 className="text-xl font-bold mb-3">
                  Disaster Relief Fund for Earthquake Victims
                </h3>
                <div className="inline-block border border-[#383838] rounded-full px-4 py-1 text-sm">
                  Disaster Victims
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Red Cross Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <a href="#" className="text-sm underline">
                    Click here for details
                  </a>
                  <button className="bg-[#383838] text-white rounded-full px-4 py-2 text-sm">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>

            {/* UNICEF Card */}
            <div className="bg-white rounded-xl p-6 flex flex-col justify-between h-72 relative border border-[#d9d9d9]">
              <div className="flex justify-between">
                <div className="bg-[#f9f9f9] rounded-full px-3 py-1 text-xs">
                  10 Sep 2025
                </div>
                <div className="flex space-x-2">
                  <Image
                    src="/placeholder.svg?height=24&width=24"
                    alt="Afghanistan Flag"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <button className="text-[#383838]">
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5C1 2.79086 2.79086 1 5 1H11C13.2091 1 15 2.79086 15 5V19L8 15.5L1 19V5Z"
                        stroke="#383838"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm mb-1">UNICEF</p>
                <h3 className="text-xl font-bold mb-3">
                  Child Nutrition Program
                </h3>
                <div className="inline-block border border-[#383838] rounded-full px-4 py-1 text-sm">
                  Children
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="UNICEF Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <a href="#" className="text-sm underline">
                    Click here for details
                  </a>
                  <button className="bg-[#383838] text-white rounded-full px-4 py-2 text-sm">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
}
