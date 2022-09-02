import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const set_token = async (token) => {
  if (token) {
    await AsyncStorage.setItem("token", JSON.stringify(token));
  }
};

export const get_token = async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
};
export const remove_token = async () => {
  await AsyncStorage.removeItem("token");
};
export const save_language = async (lang) => {
  await AsyncStorage.setItem("language", JSON.stringify(lang));
};
export const get_language = async () => {
  const language = await AsyncStorage.getItem("language");
  return JSON.parse(language);
};

// export const getToken = () => {
//   return AsyncStorage.getItem('access_token');
// };
// export const logOut = () => {
//   AsyncStorage.removeItem("@save_nickname");
// };



