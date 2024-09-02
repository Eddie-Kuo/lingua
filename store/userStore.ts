import { Language } from "@/utils/types/type";
import { create } from "zustand";

type UserStore = {
  language: Language;
  phoneNumber: string;
  setLanguage: (language: Language) => void;
  setPhoneNumber: (phone: string) => void;
};

const useUserStore = create<UserStore>((set) => ({
  language: { language: "English" },
  phoneNumber: "",
  setLanguage: (lang: Language) => set({ language: lang }),
  setPhoneNumber: (phone: string) => set({ phoneNumber: phone }),
}));

export default useUserStore;
