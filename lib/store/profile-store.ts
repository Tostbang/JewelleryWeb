import { create } from "zustand";
import { Role } from "../types"

export type Profile = {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  roleId: Role;
  isApproved: boolean,
  registerLat: number,
  registerLng: number
}

type ProfileStore = {
  profile: Profile | null
  setProfile: (profile: Profile | null) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  setProfile: (profile) => set(() => ({ profile: profile }))
}))