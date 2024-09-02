import { Language } from "@/utils/types/type";
import { create } from "zustand";

type LanguageStore = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const useLanguageStore = create<LanguageStore>((set) => ({
  language: { language: "English" },
  setLanguage: (lang: Language) => set({ language: lang }),
}));

export default useLanguageStore;
