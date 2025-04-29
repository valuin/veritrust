import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SavedAidsState {
  savedIds: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  isSaved: (id: string) => boolean;
}

export const useSavedAidsStore = create<SavedAidsState>()(
  persist(
    (set, get) => ({
      savedIds: [],
      add: (id) =>
        set((state) =>
          state.savedIds.includes(id)
            ? state
            : { savedIds: [...state.savedIds, id] }
        ),
      remove: (id) =>
        set((state) => ({
          savedIds: state.savedIds.filter((savedId) => savedId !== id),
        })),
      isSaved: (id) => get().savedIds.includes(id),
    }),
    {
      name: "saved-aids",
    }
  )
);