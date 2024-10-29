export type Language = {
  language: "English" | "Spanish" | "Mandarin";
};

export enum Languages {
  English = "English",
  Spanish = "Spanish",
  Mandarin = "Mandarin",
}

export type UserInfo = {
  id: number;
  phone_number: string;
  first_name: string;
  last_name: string;
  pic_url: string;
  hash?: number;
  selected_language: Language;
};
