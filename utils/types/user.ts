export type Language = {
  language: "English" | "Spanish" | "Mandarin";
};

export type UserInfo = {
  id: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  pic_url: string;
  hash?: number;
  selected_language: "English" | "Spanish" | "Mandarin";
};
