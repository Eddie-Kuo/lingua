import { supabase } from "@/utils/supabase";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

export async function selectNewImage(phoneNumber: string) {
  const options: ImagePicker.ImagePickerOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
  };

  const result = await ImagePicker.launchImageLibraryAsync(options);

  if (result.canceled) {
    return;
  }
  const image = result.assets[0];
  const base64 = await FileSystem.readAsStringAsync(image.uri, {
    encoding: "base64",
  });
  const filePath = `${phoneNumber}/avatarImage.${
    image.type === "image" ? "png" : "mp4"
  }`;
  const contentType = image.type === "image" ? "image/png" : "video/mp4";
  const { data } = await supabase.storage
    .from("avatars")
    .upload(filePath, decode(base64), { contentType, upsert: true });

  if (!data) {
    return Error("Error adding image to bucket");
  }
  return data.path;
}

export async function getPublicAvatarURL(imagePath: string) {
  const { data } = supabase.storage.from("avatars").getPublicUrl(imagePath);
  return data.publicUrl;
}
