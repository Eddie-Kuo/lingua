export type Language = {
  language: "English" | "Spanish" | "Mandarin";
};

export type UserInfo = {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  picURL: string;
  hash: number;
  selectedLanguage: "English" | "Spanish" | "Mandarin";
};
