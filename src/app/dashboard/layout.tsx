import UserProfileMenu from "@/components/screen/dashboard/user-profile-menu";
import { createClient } from "@/lib/server";
import { Footer } from "@/components/ui/footer";
import React from "react";
import Image from "next/image";
import DashboardNavBarWrapper from "@/components/ui/DashboardNavBarWrapper";

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
      <header className="bg-[#0039c7] sticky top-0 z-40 text-white py-4 px-6 shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 mr-2">
                <Image
                  src="/group-1-1.png"
                  alt="VeriTrust Logo"
                  width={40}
                  height={40}
                  className="rounded-full mt-1"
                />
              </div>
              <span className="text-xl font-bold">VeriTrust</span>
            </div>
            <DashboardNavBarWrapper className="right-8 pr-20 bottom-2" />
          </div>
          {/* User Profile Menu Component */}
          <UserProfileMenu userProfile={userProfile} />
        </div>
      </header>
      {children}
      <Footer />
    </div>
  );
}
