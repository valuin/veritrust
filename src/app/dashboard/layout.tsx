import UserProfileMenu from "@/components/layout/UserProfileMenu"; // Import komponen baru
import { createClient } from "@/lib/server";
import React from "react";

interface UserProfile {
  id: string;
  full_name?: string | null;
  email?: string | null;
  country?: string | null;
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  let userProfile: UserProfile | null = null;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    const { data, error } = await supabase
      .from("users")
      .select("id, full_name, email, country") // Select only needed fields
      .eq("id", session.user.id)
      .single(); // Expecting only one row

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching user profile in layout:", error);
    } else if (data) {
      userProfile = data as UserProfile;
    }
  }

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
          {/* User Profile Menu Component */}
          <UserProfileMenu userProfile={userProfile} />
        </div>
      </header>
      {children}
    </div>
  );
}
