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
  userInfo: UserInfo;
  setUserInfo: (user: UserInfo) => void;
  updateUserInfo: (user: Partial<UserInfo>) => void;
};

const useUserStore = create<UserStore>((set) => ({
  userInfo: {
    id: Infinity,
    phone_number: "",
    selected_language: "English",
    first_name: "",
    last_name: "",
    pic_url: "",
  },
  setUserInfo: (user: UserInfo) => {
    set({ userInfo: user });
    persistData("userInfo", user);
  },
  updateUserInfo: (updatedUserProperty: Partial<UserInfo>) => {
    set((state) => {
      const updatedUserInfo = { ...state.userInfo, ...updatedUserProperty };
      persistData("userInfo", updatedUserInfo);
      return { userInfo: updatedUserInfo };
    });
  },
}));

// Load persisted data on initialization
// IIFE Immediately Invoked Function Expression - defined and executed immediately after it is created
(async () => {
  const userInfo = await loadData("userInfo");

  useUserStore.setState({
    userInfo: userInfo,
  });
})();

export default useUserStore;
