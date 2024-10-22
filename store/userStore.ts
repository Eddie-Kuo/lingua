import { Language, UserInfo } from "@/types/user";
import { create } from "zustand";

type UserStore = {
  language: Language;
  phoneNumber: string;
  userInfo: UserInfo | null;
  setUserInfo: (user: UserInfo) => void;
  setLanguage: (language: Language) => void;
  setPhoneNumber: (phone: string) => void;
};

const useUserStore = create<UserStore>((set) => ({
  language: { language: "English" },
  phoneNumber: "",
  userInfo: null,
  setUserInfo: (user: UserInfo) => set({ userInfo: user }),
  setLanguage: (lang: Language) => set({ language: lang }),
  setPhoneNumber: (phone: string) => set({ phoneNumber: phone }),
}));

export default useUserStore;
