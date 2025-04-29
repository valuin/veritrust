"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Bell, LayoutGrid, LogOut, X } from "lucide-react";
import { createClient } from "@/lib/client"; // Gunakan client Supabase
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Import Button

interface UserProfile {
  id: string;
  full_name?: string | null;
  email?: string | null;
  country?: string | null;
}

interface UserProfileMenuProps {
  userProfile: UserProfile | null;
}

export default function UserProfileMenu({ userProfile }: UserProfileMenuProps) {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const supabase = createClient();

  const displayName = userProfile?.full_name || "User";
  const displayLocation = userProfile?.country || "Unknown Location";

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    } else {
      router.push("/landing/login");
      router.refresh();
    }
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <MapPin className="w-5 h-5 mr-2" />
        <span>{displayLocation}</span>
      </div>
      <div className="flex items-center space-x-2">
        {/* User Avatar/Initial */}
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          <span className="text-gray-600 text-lg font-semibold">
            {displayName.charAt(0).toUpperCase()}
          </span>
          {/* Jika ada URL gambar profil:
                    <Image src={profileImageUrl} alt={displayName} width={40} height={40} />
                    */}
        </div>
        {/* Grid Icon */}
        <button className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/20 transition-colors">
          <LayoutGrid className="w-5 h-5" />
        </button>
        {/* Bell Icon */}
        <button className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/20 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        {/* Flag Icon */}
        <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center overflow-hidden">
          {/* Ganti dengan logika bendera negara jika ada */}
          <Image
            src="/placeholder.svg?height=24&width=24"
            alt="Flag"
            width={24}
            height={24}
            className="rounded-full"
          />
        </div>
        {/* Logout Button */}
        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-red-500/80 transition-colors text-white"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Konfirmasi Logout
              </h2>
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin keluar?
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsLogoutModalOpen(false)}
              >
                Batal
              </Button>
              <Button
                variant="destructive" // Warna merah untuk aksi destruktif
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
