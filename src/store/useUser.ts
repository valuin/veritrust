import { create } from "zustand";
import { createClient } from "@/lib/client"; 
import type { User } from "@supabase/supabase-js";

interface UserProfile {
  id: string;
  full_name?: string | null;
  email?: string | null;
  phone_number?: string | null;
  country?: string | null;
  prove_of_identity?: string[] | null; 
  prove_of_income?: string | null; 
  category?: string[] | null;
  additional_document?: string[] | null;
  job?: string | null;
  family_number?: string | null;
  background_story?: string | null;
  gender?: string | null;
  aid_tags?: string[] | null;
  cheqd_did?: string | null;
}

interface AppUser extends User {
  profile?: UserProfile | null;
}

interface UserState {
  user: AppUser | null;
  isLoading: boolean;
  error: string | null;
  hasFetched: boolean;
  fetchUser: () => Promise<void>;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  hasFetched: false,

  fetchUser: async () => {
    set({ isLoading: true, error: null, hasFetched: true });
    try {
      const supabase = await createClient();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        if (authError.message !== "No active session") throw authError;
        set({ user: null, isLoading: false });
        return;
      }

      if (!user) {
        set({ user: null, isLoading: false });
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.warn("Could not fetch user profile:", profileError.message);
        set({ user: { ...user, profile: null }, isLoading: false });
      } else {
        set({
          user: { ...user, profile: profileData as UserProfile },
          isLoading: false,
        });
      }
    } catch (error: any) {
      console.error("Error fetching user:", error);
      set({
        user: null,
        isLoading: false,
        error: error.message || "Failed to fetch user data",
      });
    }
  },

  clearUser: () => {
    set({ user: null, isLoading: false, error: null, hasFetched: false });
  },
}));
