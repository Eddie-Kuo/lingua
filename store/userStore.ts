import { Language, UserInfo } from "@/types/user";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Helper function to persist data
const persistData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving data", error);
  }
};

// Helper function to load data
const loadData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error loading data", error);
    return null;
  }
};

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
  setUserInfo: (user: UserInfo) => {
    set({ userInfo: user });
    persistData("userInfo", user);
  },
  setLanguage: (lang: Language) => {
    set({ language: lang });
    persistData("language", lang);
  },
  setPhoneNumber: (phone: string) => {
    set({ phoneNumber: phone });
    persistData("phoneNumber", phone);
  },
}));

// Load persisted data on initialization
// IIFE Immediately Invoked Function Expression - defined and executed immediately after it is created
(async () => {
  const userInfo = await loadData("userInfo");
  const language = await loadData("language");
  const phoneNumber = await loadData("phoneNumber");

  useUserStore.setState({
    userInfo: userInfo || null,
    language: language || { language: "English" },
    phoneNumber: phoneNumber || "",
  });
})();

export default useUserStore;
